const { createDepartment, findDepartment } = require("../DBService/departmentDBServices");

exports.createController = async (req, res, next) => {
  const { name } = req.body;
//   console.log(name);
  try {
    const result = await createDepartment({name:name});
    // console.log(result);
    res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};

exports.findController = async (req,res,next) =>{
  try {
    console.log("---------");
    const result = await findDepartment()
    // console.log(result);
    res.json(result)
  } catch (error) {
    
  }
}
