const {
  uploadFileToS3,
  deleteFileFromS3,
  getFileMetadata,
  listFilesFromS3,
  downloadFileFromS3,
} = require('./helpers/s3.helper');

const uploadFile = async (req, res) => {
  try {
    const result = await uploadFileToS3(req.file);
    res.json({ message: 'File uploaded successfully', fileId: result.Key });
  } catch (e) {
    res.status(500).json({ error: `Error uploading file: ${e}` });
  }
};

const downloadFile = (req, res) => {
  try {
    const fileStream = downloadFileFromS3(req.params.fileId);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
};

const getFiles = async (req, res) => {
  try {
    const result = await listFilesFromS3();
    const files = result.Contents.map((file) => ({
      Key: file.Key,
      Size: file.Size,
    }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error listing files' });
  }
};

const getFileMetadataByFileId = async (req, res) => {
  try {
    const metadata = await getFileMetadata(req.params.fileId);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving metadata' });
  }
};

const deleteFile = async (req, res) => {
  try {
    await deleteFileFromS3(req.params.fileId);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file' });
  }
};

const updateFile = async (req, res) => {
  try {
    // Delete the old file first
    await deleteFileFromS3(req.params.fileId);
    // Upload the new file
    const result = await uploadFileToS3(req.file);
    res.json({ message: 'File updated successfully', fileId: result.Key });
  } catch (error) {
    res.status(500).json({ error: 'Error updating file' });
  }
};

const renameFile = async (req, res) => {
  try {
    const { newFileName } = req.body;
    await getFileMetadata(req.params.fileId);
    const params = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${req.params.fileId}`,
      Key: newFileName,
    };
    // Copy file to new location
    await s3.copyObject(params).promise();
    // Delete old file
    await deleteFileFromS3(req.params.fileId);
    res.json({ message: 'File renamed successfully', newFileId: newFileName });
  } catch (error) {
    res.status(500).json({ error: 'Error renaming file' });
  }
};

const searchFile = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await listFilesFromS3();
    const files = result.Contents.filter((file) => file.Key.includes(name));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error searching files' });
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  getFiles,
  getFileMetadataByFileId,
  deleteFile,
  updateFile,
  renameFile,
  searchFile,
};
