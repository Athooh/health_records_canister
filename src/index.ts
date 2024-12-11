// Importing required dependencies
import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap, ic } from "azle";
import express from "express";

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

// Setting up the Express application
const app = express();
app.use(express.json());

// Helper function to get the current date
function getCurrentDate() {
    const timestamp = new Number(ic.time());
    return new Date(timestamp.valueOf() / 1_000_000);
}

// Endpoint to create a new health record
app.post("/health-records", (req, res) => {
    const healthRecord: HealthRecord = {
        id: uuidv4(),
        createdAt: getCurrentDate(),
        updatedAt: null,
        ...req.body,
    };
    healthRecordsStorage.insert(healthRecord.id, healthRecord);
    res.json(healthRecord);
});

// Endpoint to retrieve all health records
app.get("/health-records", (req, res) => {
    res.json(healthRecordsStorage.values());
});

// Endpoint to retrieve a specific health record by ID
app.get("/health-records/:id", (req, res) => {
    const recordId = req.params.id;
    const recordOpt = healthRecordsStorage.get(recordId);
    if (!recordOpt) {
        res.status(404).send(`Health record with id=${recordId} not found`);
    } else {
        res.json(recordOpt.Some);
    }
});

// Endpoint to update a health record
app.put("/health-records/:id", (req, res) => {
    const recordId = req.params.id;
    const recordOpt = healthRecordsStorage.get(recordId);
    if (!recordOpt) {
        res.status(400).send(`Couldn't update health record with id=${recordId}. Record not found.`);
    } else {
        const record = recordOpt.Some!; // Add non-null assertion to indicate that record is defined
        const updatedRecord = {
            ...record,
            ...req.body,
            updatedAt: getCurrentDate(),
        };
        healthRecordsStorage.insert(record.id, updatedRecord);
        res.json(updatedRecord);
    }
});

// Endpoint to delete a health record
app.delete("/health-records/:id", (req, res) => {
    const recordId = req.params.id;
    const deletedRecord = healthRecordsStorage.remove(recordId);
    if (!deletedRecord) {
        res.status(400).send(`Couldn't delete health record with id=${recordId}. Record not found.`);
    } else {
        res.json(deletedRecord.Some);
    }
});

// Starting the server
app.listen();