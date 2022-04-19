import { SetMetadata } from '@nestjs/common';

export const STATUSES = 'statuses';
export const Statuses = (...statuses: string[]) =>
	SetMetadata(STATUSES, statuses);
