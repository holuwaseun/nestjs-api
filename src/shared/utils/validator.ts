import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema, z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown): unknown {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        throw new BadRequestException({
          errors: formattedErrors,
          message: 'Validation failed',
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

export const MetaSchema = z.object({
  page: z.coerce.number(),
  perPage: z.coerce.number(),
  totalPages: z.coerce.number(),
  totalRows: z.coerce.number(),
});

export const PaginateSchema = z.object({
  count: z.coerce.number(),
  page: z.coerce.number(),
});
