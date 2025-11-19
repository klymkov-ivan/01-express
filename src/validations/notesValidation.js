import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
      'number.max': 'Page must be at most {#limit}',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'Per page must be a number',
      'number.min': 'Per page must be at least {#limit}',
      'number.max': 'Per page must be at most {#limit}',
    }),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.message('Invalid id format');
        }

        return value;
      })
      .required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit} character long',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit} character long',
    }),
    content: Joi.string().allow('').messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
      }),
  })
    .min(1)
    .messages({
      'object.min': 'Provide at least one of: title, content, tag',
    }),
};
