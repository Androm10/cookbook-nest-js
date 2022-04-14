import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CheckRolesGuard } from './guards/check-roles.guard';
import { CheckStatusesGuard } from './guards/check-status.guard';
import { RMQ_BROKER } from 'src/constants/rabbitmq';
import { RabbitBroker } from 'src/services/rabbitmq/broker.service';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('auth.secret'),
            signOptions: { expiresIn: configService.get<string>('auth.expiresIn') },
            }),
            inject: [ConfigService]
        }),
        
    ],
    providers: [
        AuthService, 
        JwtStrategy, 
    {
        provide : APP_GUARD,
        useClass : JwtAuthGuard
    },
    {
        provide : APP_GUARD,
        useClass : CheckRolesGuard
    },
    {
        provide : APP_GUARD,
        useClass : CheckStatusesGuard
    }
],
    exports: [],
})
export class AuthModule {
}
