import Joi, { ObjectSchema } from 'joi';

export const errorMessages = {
  IVALID_TITLE: '標題為必填欄位！',
  IVALID_TAGS: '標籤必須是字符串數組！',
  IVALID_SLUG: '代稱為必填欄位！',
  IVALID_META: 'meta描述為必填欄位！',
  IVALID_CONTENT: '文章內容為必填欄位！',
};

export const postValidationSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.empty': errorMessages.IVALID_TITLE,
    'any.required': errorMessages.IVALID_TITLE,
  }),
  content: Joi.string().required().messages({
    'string.empty': errorMessages.IVALID_CONTENT,
    'any.required': errorMessages.IVALID_CONTENT,
  }),
  slug: Joi.string().required().messages({
    'string.empty': errorMessages.IVALID_SLUG,
    'any.required': errorMessages.IVALID_SLUG,
  }),
  meta: Joi.string().required().messages({
    'string.empty': errorMessages.IVALID_META,
    'any.required': errorMessages.IVALID_META,
  }),
  tags: Joi.array().items(Joi.string()).messages({
    'string.base': errorMessages.IVALID_TAGS,
    'string.empty': errorMessages.IVALID_TAGS,
  }),
});

export const validateSchema = (schema: ObjectSchema, value: any) => {
  const { error } = schema.validate(value, {
    errors: { label: 'key', wrap: { label: false, array: false } },
    allowUnknown: true,
  });

  if (error) return error.details[0].message;

  return '';
};
