export default async (err, req, res, next) => {
  const { name, message } = err;

  switch (name) {
    case "SchemaValidationError":
      res.status(400).json({ status: "fail", message });
      break;
    case "SupabaseError":
        if (err.error.code === "23505") {
          res.status(400).json({
            status: "fail",
            message: err.error.details,
          });
        } else {
          res.status(500).json({
            status: "fail",
            message:
              "We are faced with some errors on our server, please try again later!!",
          });
        }
      break;
    default:
      res
        .status(500)
        .json({
          status: "fail",
          message:
            "We are faced with some errors on our server, please try again later!!",
        });
      break;
  }
};
