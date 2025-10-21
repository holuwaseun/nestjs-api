import { z } from 'zod';
import { ApiPropertyOptions } from '@nestjs/swagger';

/**
 * Helper function to convert Zod schemas to Swagger/OpenAPI schema
 * This can be used to generate Swagger documentation from Zod schemas
 */
export function zodToOpenAPI(schema: z.ZodTypeAny): any {
  if (schema instanceof z.ZodString) {
    return { type: 'string' };
  }
  if (schema instanceof z.ZodNumber) {
    return { type: 'number' };
  }
  if (schema instanceof z.ZodBoolean) {
    return { type: 'boolean' };
  }
  if (schema instanceof z.ZodDate) {
    return { type: 'string', format: 'date-time' };
  }
  if (schema instanceof z.ZodEnum) {
    return { type: 'string', enum: schema.options };
  }
  if (schema instanceof z.ZodArray) {
    return {
      type: 'array',
      items: zodToOpenAPI(schema.element as z.ZodTypeAny),
    };
  }
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const properties: Record<string, any> = {};
    const required: string[] = [];

    for (const key in shape) {
      const fieldSchema = shape[key];
      properties[key] = zodToOpenAPI(fieldSchema);

      if (!(fieldSchema instanceof z.ZodOptional)) {
        required.push(key);
      }
    }

    return {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined,
    };
  }
  if (schema instanceof z.ZodOptional) {
    return zodToOpenAPI(schema.unwrap() as z.ZodTypeAny);
  }

  return { type: 'any' };
}

/**
 * Create ApiPropertyOptions from a Zod schema
 */
export function zodToApiProperty(
  schema: z.ZodTypeAny,
  options?: Partial<ApiPropertyOptions>,
): ApiPropertyOptions {
  const openApiSchema = zodToOpenAPI(schema);

  return {
    ...openApiSchema,
    ...options,
  };
}
