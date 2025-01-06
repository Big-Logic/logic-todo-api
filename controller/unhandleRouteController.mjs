export default async(req, res) => {
    res
      .status(404)
      .json({ status: "fail", message: "Nothing found at this route" });
}