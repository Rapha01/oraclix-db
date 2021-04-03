const userModel = require('../models/userModel.js');
const fct = require('../util/fct.js');

exports.get = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.get(req.params.id);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}

exports.getBySourceId = async (req, res, next) => {
  try {
    if (!fct.checkDBApiAuth(req))
      return res.send(fct.apiResponseJson([],'Authorization failed.'));

    const user = await userModel.getBySourceId(req.params.source,req.params.sourceId);

    res.send(fct.apiResponseJson(user,null));
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Could not get guild'));
  }
}

exports.create = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      const id = await userModel.create(req.body.source,req.body.sourceId,req.body.username);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'userUpdateError'));
    }
  } catch (e) { console.log(e); }
}

exports.set = async (req, res, next) => {
  try {
    try {
      if (!fct.checkDBApiAuth(req))
        return res.send(fct.apiResponseJson([],'Authorization failed.'));

      await userModel.set(req.body.userId,req.body.field,req.body.value);

      res.send(fct.apiResponseJson([],null));
    } catch (e) {
      console.log(e);
      res.send(fct.apiResponseJson([],'userUpdateError'));
    }
  } catch (e) { console.log(e); }
}
