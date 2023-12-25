const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      // Send a 400 Bad Request response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }

    // Replace req.body with the validated value
    req.body = value;
    next();
  };
};

module.exports = validateSchema;
