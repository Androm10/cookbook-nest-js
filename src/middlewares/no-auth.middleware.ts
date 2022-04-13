import { SetMetadata } from '@nestjs/common';

export const NO_AUTH = 'noAuth';
export const NoAuth = () => SetMetadata(NO_AUTH, true);