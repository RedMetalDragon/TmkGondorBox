# File Management Microservice using AWS S3

This microservice is built using Node.js and AWS S3 to manage files.

## Prerequisites

- Node.js and npm installed on your machine.
- AWS S3 bucket
- An AWS account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RedMetalDragon/TmkGondorBox.git
cd TmkGondorBox
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=3000
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_BUCKET_NAME=your-s3-bucket
```

Replace the values with your AWS credentials and S3 bucket.

### 4. Run the Microservice

- **To start the server**:

  ```bash
  npm run start
  ```

- **To run the server in development mode with auto-reloading**:

  ```bash
  npm run dev
  ```

- **To format the code**:

  ```bash
  npm run format
  ```

### 5. Check the endpoints

You can check the Swagger documentation through 

  ```bash
  http://localhost:3000/api-docs/
  ```