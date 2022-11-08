const { body, validationResult } = require('express-validator')
const createUserValidationRules = () => {
  return [
    body('name').notEmpty().isString().isLength({min: 3, max: 10}).withMessage("Name* is a string with min 3 max 10"),
    // email must be an email
    body('email').notEmpty().isEmail().withMessage("Email* must be valid email"),
    // password must be at least 5 chars long
    body('password').notEmpty().isLength({ min: 6 }).withMessage("Password* must be greater than 5"),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  createUserValidationRules,
  validate,
}