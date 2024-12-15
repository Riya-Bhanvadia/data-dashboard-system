exports.requireSignin = (req, res, next) => {
    const bearerHeader = req.get("Authorization");
    console.log(bearerHeader);
    if (!bearerHeader) {
      const error = new Error("No authorization header found");
      throw error;
    }
    // console.log(bearerHeader);
    if (typeof bearerHeader !== undefined) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      let verify;
  
      try {
        verify = jwt.verify(bearerToken, "SECRETKEY");
      } catch (error) {
        throw error;
      }
      if (verify) {
        req.token = bearerToken;
        next();
      } else {
        const error = new Error("jwt verification failed");
        throw error;
      }
    }
  };