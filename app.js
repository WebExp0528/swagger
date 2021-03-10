var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var guid = require('guid');

var excel = require('./excel-generator');
var excel_generator = require('./excel-generator-common');
var control_excel = require('./control_excel-generator');

var port = process.env.PORT || 3000;

var xlsDirectory = __dirname + '/excel/';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type');

  // Pass to next layer of middleware
  next();
});

/* GET home page. */
app.get('/', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

/* Create Excel Temp File */
app.post('/node/createExcel', function (req, res, next) {
  var data = req.body;
  console.log(data);
  var fileName = guid.raw();
  data.filename = fileName;
  excel_generator(xlsDirectory, data)
    .then((location) => {
      console.log(`Created excel file[${fileName}] in path[${location}]`);
      res.status(200);
      res.end(fileName);
    })
    .catch((err) => {
      res.status(500);
      res.end(`Cannot create Excel. We are so sorry. err=> ${err.toString()}`);
    });
});

/* Download Excel File and Delete temp file */
app.get('/node/downloadExcel/:fileName', function (req, res, next) {
  var fileName = req.params.fileName;
  var filePath = xlsDirectory + fileName;

  if (fs.existsSync(filePath)) {
    res.status(200);
    res.append(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.append('Content-Disposition', 'attachment; filename=output.xlsx');
    fs.readFile(filePath, function (err, data) {
      res.end(data);
      fs.unlink(filePath, function (err) {
        if (err) {
          console.log('Unlink failed at /downloadExcel: ', err);
        }
      });
    });
  } else {
    res.status(404);
    res.end('Requested file does not exist!');
  }
});

app.post('/node/xlsx', function (req, res, next) {
  var data = req.body;
  var fileName = guid.raw();
  data.filename = fileName;
  excel(xlsDirectory, data, function (err, location) {
    if (!err) {
      res.status(200);
      res.end(fileName);
    } else {
      res.status(500);
      res.end('Cannot fulfill the request. We are so sorry.');
    }
  });
});

app.post('/node/control_xlsx', function (req, res, next) {
  console.log(req);
  var data = req.body;
  var fileName = guid.raw();
  data.filename = fileName;
  control_excel(xlsDirectory, data, function (err, location) {
    if (!err) {
      res.status(200);
      res.end(fileName);
    } else {
      res.status(500);
      res.end('Cannot fulfill the request. We are so sorry.');
    }
  });
});

app.get('/node/download-excel/:fileName', function (req, res, next) {
  var fileName = req.params.fileName;
  var filePath = xlsDirectory + fileName;

  if (fs.existsSync(filePath)) {
    res.status(200);
    res.append(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.append('Content-Disposition', 'attachment; filename=output.xlsx');
    fs.readFile(filePath, function (err, data) {
      res.end(data);
      fs.unlink(filePath, function (err) {
        if (err) {
          console.log('Unlink failed at /download-excel: ', err);
        }
      });
    });
  } else {
    res.status(404);
    res.end('Requested file does not exist!');
  }
});

app.get('/node/control_excel_download/:fileName', function (req, res, next) {
  var fileName = req.params.fileName;
  var filePath = xlsDirectory + fileName;

  if (fs.existsSync(filePath)) {
    res.status(200);
    res.append(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.append('Content-Disposition', 'attachment; filename=output.xlsx');
    fs.readFile(filePath, function (err, data) {
      res.end(data);
      fs.unlink(filePath);
    });
  } else {
    res.status(404);
    res.end('Requested file does not exist!');
  }
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log('App listening on port ' + port);
