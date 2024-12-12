export default (req, res, next) => {

    const userId = "d78f2ab0-4c27-49b7-93fd-8ab15d708def";
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