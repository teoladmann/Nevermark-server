require('dotenv').config({ path : '../.env.dev' });

const buildQuery = (query,req) => {
  let pageNum = 0;
  if (req.params.pageNum !== undefined) pageNum = req.params.pageNum - 1;

  const {NBRES_PER_FETCH} = process.env || 20;
  const defaultQuery = {
    index : process.env.ELASTIC_INDEX,
    track_scores : true,
    body : {
      size : NBRES_PER_FETCH,
      from : pageNum * NBRES_PER_FETCH,
      query : {},
      sort : {
        _score : 'desc',
        'log.visitStartTime' : {order : 'desc'}
      }
    }
  };

  if (typeof query === 'object') {
    Object.assign(defaultQuery.body.query,query.body.query);
    if (query.body.sort) {
      defaultQuery.body.sort = query.body.sort;
    }
    console.log(defaultQuery);
    return defaultQuery;
  }
};

module.exports = buildQuery;