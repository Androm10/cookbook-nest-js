import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: (new ConfigService()).get<string>('secret'),
            signOptions: { expiresIn: '2h' },
        }),
        
    ],
    providers: [JwtStrategy, AuthService],
    exports: [PassportModule],
})
export class AuthModule {}
