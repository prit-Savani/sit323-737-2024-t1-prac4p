
const express= require("express");
const res = require("express/lib/response");
const app= express();
const winston = require('winston');
const excludeErrorLevel = winston.format((info) => {
  if(info.level === 'error'){
      return false; 
  }
  return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log',format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        excludeErrorLevel() 
    ) }),
    ],
  });
  
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }


app.get("/addition", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const n3 = n1+n2;
    res.status(200).json({statuscocde:200, data: n3 }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

app.get("/sub", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for substraction');
  const n3 = n1-n2;
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/mul", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
  const n3 = n1*n2;
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get("/div", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for division');
  const n3 = n1/n2;
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const port=3040;
app.listen(port,()=> {
    console.log(`Server is running on http://localhost:${port}`);
})
