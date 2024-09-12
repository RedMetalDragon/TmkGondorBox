require('dotenv').config();

const bucketName = process.env.AWS_BUCKET_NAME;
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

// Utility function to upload to S3
const uploadFileToS3 = (file) => {
  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};

// Utility function to delete from S3
const deleteFileFromS3 = (fileId) => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
  };
  return s3.deleteObject(params).promise();
};

// Utility function to get metadata from S3
const getFileMetadata = (fileId) => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
  };
  return s3.headObject(params).promise();
};

// Utility function to list files in S3
const listFilesFromS3 = () => {
  const params = {
    Bucket: bucketName,
  };
  return s3.listObjectsV2(params).promise();
};

// Utility function to download file from S3
const downloadFileFromS3 = (fileId) => {
  const params = {
    Bucket: bucketName,
    Key: fileId,
  };
  return s3.getObject(params).createReadStream();
};

module.exports = {
  uploadFileToS3,
  deleteFileFromS3,
  getFileMetadata,
  listFilesFromS3,
  downloadFileFromS3,
};
