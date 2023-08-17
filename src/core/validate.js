import Joi from "joi"
/**
 * @returns {Joi}
 */
function is() {
    return Joi
}

function validateSchema(schema, input) {
    const joiSchema = Joi.object(schema);
    const { error } = joiSchema.validate(input, { abortEarly: false, allowUnknown: true });
    if (error) {
        const errorsByKey = {};
        error.details.forEach(detail => {
            const key = detail.context.key;
            errorsByKey[key] = detail.message;
        });

        console.log('Errors by key:', errorsByKey);
        return errorsByKey
    }
}

export { validateSchema }
export default is;