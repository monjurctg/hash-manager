module.exports = function (req, res, next) {
  const filters = {...req.query};
  //   const excludeFields = ["sort", "page", "limit"];
  const queries = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queries.sortBy = sortBy;
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queries.fields = fields;
  }
  if (req.query.page) {
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * parseInt(limit);
    queries.limit = parseInt(limit);
    // console.log(skip, "skip");

    queries.skip = skip;
  }

  req.queries = queries;
  req.filters = filters;

  next();
};
