const { getAttendanceDB } = require("../DBService/attendanceDBServices");

exports.getEmpAttend = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    if(id === "undefined"){
      return res.json([]);
    }
    const result = await getAttendanceDB({ userId: id });
    
    let isAttend;
    if(result.attend.length === 0){
      isAttend = false
    }
    else{
      isAttend = true
    }
    const obj = {result , isAttend}
    return res.json(obj);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 422;
    }
    return next(error);
  }
};
