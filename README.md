# Health Records Canister

## Overview
This project is a TypeScript-based canister designed to manage health records using CRUD (Create, Read, Update, Delete) operations. Built on the Azle framework, this canister provides endpoints to manage patient health data securely and efficiently.

## Features
- Create new health records.
- Retrieve all health records.
- Retrieve a specific health record by ID.
- Update existing health records.
- Delete health records.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 20 or higher recommended).
- [DFX](https://internetcomputer.org/docs/current/developer-docs/quickstart/dfx-quickstart) for Internet Computer.
- Azle framework installed as a dependency.

## Setup

### 1. Install Dependencies
Ensure you have Node.js and DFX installed. Clone this repository and run:
```bash
npm install
```

### 2. Start the Local Replica
Start a local Internet Computer replica:
```bash
dfx start --background
```

### 3. Deploy the Canister
Compile and deploy the canister:
```bash
dfx deploy
```

## Endpoints

### 1. **Create a New Health Record**
**Method**: `POST`
**Endpoint**: `/health-records`

**Payload**:
```json
{
  "patientName": "John Doe",
  "diagnosis": "Flu",
  "treatmentPlan": "Rest and hydration"
}
```

**Response**:
```json
{
  "id": "<unique-id>",
  "patientName": "John Doe",
  "diagnosis": "Flu",
  "treatmentPlan": "Rest and hydration",
  "createdAt": "<timestamp>",
  "updatedAt": null
}
```

### 2. **Retrieve All Health Records**
**Method**: `GET`
**Endpoint**: `/health-records`

**Response**:
```json
[
  {
    "id": "<unique-id>",
    "patientName": "John Doe",
    "diagnosis": "Flu",
    "treatmentPlan": "Rest and hydration",
    "createdAt": "<timestamp>",
    "updatedAt": null
  }
]
```

### 3. **Retrieve a Specific Health Record**
**Method**: `GET`
**Endpoint**: `/health-records/:id`

**Response**:
```json
{
  "id": "<unique-id>",
  "patientName": "John Doe",
  "diagnosis": "Flu",
  "treatmentPlan": "Rest and hydration",
  "createdAt": "<timestamp>",
  "updatedAt": null
}
```

### 4. **Update a Health Record**
**Method**: `PUT`
**Endpoint**: `/health-records/:id`

**Payload**:
```json
{
  "diagnosis": "Severe Flu",
  "treatmentPlan": "Medication and rest"
}
```

**Response**:
```json
{
  "id": "<unique-id>",
  "patientName": "John Doe",
  "diagnosis": "Severe Flu",
  "treatmentPlan": "Medication and rest",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

### 5. **Delete a Health Record**
**Method**: `DELETE`
**Endpoint**: `/health-records/:id`

**Response**:
```json
{
  "id": "<unique-id>",
  "patientName": "John Doe",
  "diagnosis": "Flu",
  "treatmentPlan": "Rest and hydration",
  "createdAt": "<timestamp>",
  "updatedAt": null
}
```

## Testing
Use `curl` or any API testing tool (like Postman) to test the endpoints. Example commands:

### Create a Record
```bash
curl -X POST http://localhost:3000/health-records \
-H "Content-Type: application/json" \
-d '{"patientName": "John Doe", "diagnosis": "Flu", "treatmentPlan": "Rest and hydration"}'
```

### Get All Records
```bash
curl -X GET http://localhost:3000/health-records
```

### Get a Specific Record
```bash
curl -X GET http://localhost:3000/health-records/<record-id>
```

### Update a Record
```bash
curl -X PUT http://localhost:3000/health-records/<record-id> \
-H "Content-Type: application/json" \
-d '{"diagnosis": "Severe Flu", "treatmentPlan": "Medication and rest"}'
```

### Delete a Record
```bash
curl -X DELETE http://localhost:3000/health-records/<record-id>
```

## Notes
- Replace `<record-id>` with the `id` of the specific record.
- Ensure the server is running before making API calls.

## License
This project is licensed under the MIT License.

