import jwt from 'jsonwebtoken'

//doctor authentication middleware


export const authDoctor = async (req, res, next) => {
   try {
     const {dtoken} = req.headers;
     if (!dtoken) {
       return res.json({ success: false, message: "Token Missing: Not Authorized" });
     }
     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
     req.body.docId = token_decode.id;
     
     next();
   } catch (error) {
     console.error("Authentication Error:", error.message);
     res.status(401).json({ success: false, message: "Invalid or Expired Token" });
   }
 };
 