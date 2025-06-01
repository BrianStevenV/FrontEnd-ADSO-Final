export const ERROR_CODES = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES_BY_CODE = {
    [ERROR_CODES.BAD_REQUEST]: 'An error occurred while creating the product.',
    [ERROR_CODES.CONFLICT]: 'Product already exists.',
    [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
} as const;

export const GENERIC_ERROR_MESSAGE = 'Error creating category';