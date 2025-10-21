import { CATEGORY } from 'src/shared/utils/constants';

export type DB_Category = (typeof CATEGORY)[keyof typeof CATEGORY];
