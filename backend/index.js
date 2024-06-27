const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
/* 
as all req will start with /api/v1 "kinda prefix request url"
in routes/index file for app.put("/users",(req,res)=>{  here url hit will be /api/v1/users  })
*/
app.listen(3000);

