const {
  uploadFile,
  downloadFile,
  getFiles,
  getFileMetadataByFileId,
  deleteFile,
  updateFile,
  renameFile,
  searchFile,
} = require('./services/s3.service');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const express = require('express');
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/download/:fileId', downloadFile);

router.get('/files', getFiles);

router.get('/files/:fileId/metadata', getFileMetadataByFileId);

router.delete('/files/:fileId', deleteFile);

router.put('/files/:fileId', upload.single('file'), updateFile);

router.patch('/files/:fileId/rename', renameFile);

router.get('/files/search', searchFile);

/**
 * Health Check Endpoint
 * Description: Checks the health status of the GondorBox service.
 * Response: JSON object with status and message
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'GondorBox service is running' });
});

module.exports = router;
