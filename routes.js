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

module.exports = router;
