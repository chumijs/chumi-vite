/**
 * 不能直接使用require
 * https://github.com/sveltejs/kit/issues/581#issuecomment-803826496
 */
import { createRequire } from 'module';
import { PrismaClient } from '@prisma/client';

export const require = createRequire(import.meta.url);

export const prisma = new PrismaClient();
