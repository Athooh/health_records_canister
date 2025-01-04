// Importing required dependencies
import { v4 as uuidv4 } from "uuid";
import {  Server, StableBTreeMap, ic } from 'azle/experimental';
import express, { Request, Response,NextFunction } from 'express';

// Defining the structure of a health record
class HealthRecord {
    id: string;
    patientName: string;
    diagnosis: string;
    treatmentPlan: string;
    createdAt: Date;
    updatedAt: Date | null;
}

// Initializing the storage for health records
const healthRecordsStorage = StableBTreeMap<string, HealthRecord>(0);



// Helper function to get the current date
function getCurrentDate() {
    const timestamp = new Number(ic.time());
    return new Date(timestamp.valueOf() / 1_000_000);
}

export default Server(()=>{
  // Setting up the Express application
     const app = express();
     app.use(express.json());
    
     // Endpoint to create a new health record
     app.post('/health-records', (req:any, res:Response) => {
      try{

        const healthRecord: HealthRecord = {
            id: uuidv4(),
            createdAt: getCurrentDate(),
            updatedAt: null,
            ...req.body,
        };
        healthRecordsStorage.insert(healthRecord.id, healthRecord)
       return res.status(201).json({ status:201, healthRecord});
      }catch(error: any) {
        console.log(error)
        return res.status(500).json({ status: 500, error: error.message })
      }
});

// Endpoint to retrieve all health records
app.get("/health-records", (req:Request, res:Response) => {
   try{
    return res.status(200).json({ status:200, AllHealth:healthRecordsStorage.values()});
   }catch(error: any) {
    return res.status(500).json({status: 500, error: error.message})
   }
});

// Endpoint to retrieve a specific health record by ID
app.get("/health-records/:id", (req:Request, res:Response) => {
  try{
    const recordId = req.params.id;
    const recordOpt = healthRecordsStorage.get(recordId);
    if (!recordOpt) {
       return res.status(404).send(`Health record with id=${recordId} not found`);
    } else {
       return res.status(200).json({status: 200, recordOpt});
    }
  }catch(error: any) {
    return res.status(500).json({status: 500, error: error.message})
  }
});

// Endpoint to update a health record
app.put("/health-records/:id", (req:Request, res:Response) => {
   try{
    const recordId = req.params.id;
    const recordOpt = healthRecordsStorage.get(recordId);
    if (!recordOpt) {
       return res.status(400).send(`Couldn't update health record with id=${recordId}. Record not found.`);
    } else {
        const record = recordOpt; // Add non-null assertion to indicate that record is defined
        const updatedRecord = {
            ...record,
            ...req.body,
            updatedAt: getCurrentDate(),
        };
        healthRecordsStorage.insert(record.id, updatedRecord);
        return res.status(200).json({ status:200, updatedRecord });
    }
   }catch(error: any) {
    return res.status(500).json({ status: 500, error: error.message })
   }
});

// Endpoint to delete a health record
app.delete("/health-records/:id", (req:Request, res:Response) => {
   try{
    const recordId = req.params.id;
    const deletedRecord = healthRecordsStorage.remove(recordId);
    if (!deletedRecord) {
       return res.status(400).send(`Couldn't delete health record with id=${recordId}. Record not found.`);
    } else {
      return res.status(200).json({ status:200, deletedRecord });
    }
   }catch(error:any) {
    return res.status(500).json({status: 500, error: error.message})
   }
});

// Starting the server
const PORT = 8000
return app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
})