export default (req, res, next) => {

    const userId = req.user_id;
    const {method} = req;
    
    switch (method) {
      case "GET":
      case "PATCH":
      case "DELETE":
        req.query.user_id = userId;
        break;
      case "POST":
        req.body.user_id = userId;
        break;
    }

    next();
}