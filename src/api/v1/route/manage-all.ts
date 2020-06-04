import "reflect-metadata";
import {getConnection,getMongoManager} from "typeorm";
import {Dataset_Student} from "../../../entity/Dataset_Student";
import universityInfo from "../../../model/Universiry";
import pushData from "../../../../services/pushData";
import {Dataset_Company} from "../../../entity/Dataset_Company";
let express = require("express")
let bodyParser = require("body-parser")
var exceltojson = require("xls-to-json-lc");
const fileUpload = require('express-fileupload');
var uniqid = require('uniqid');
var request = require("request");
var eclairjs = require('eclairjs');
const fs = require('fs');
let app = express.Router()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// ใช้ในการเเสดงข้อมูลของ dropdown
app.get('/home',async function(req, res) {
        let university_names = await universityInfo.getUniversityNames()
        let year = await universityInfo.getYear()
        let faculty = await universityInfo.getFaculty()
        let endyear = await pushData.endyear(year)
        // let facultys = pushData.faculty(faculty)
        let university_namess = pushData.university_name(university_names)
        let years = pushData.year(year)
        res.status(200).json({
            statusName: 'success',
            university_names:university_namess,
            years:years,
            facultys:faculty,
            endyear:endyear
        })
    }
);

// ใช้ในการเช็คจำนวนคนรายปีของเเต่ละคณะ
app.post('/checkfaculty-university',async function(req, res) {
    console.log("hi")
        let university_name = req.body.university_name
        let year = req.body.year
        let result = await universityInfo.getdatainuniversirt(university_name,year)
        let facultys = pushData.faculty(result)
        let amounts = pushData.amount(result)
            res.status(200).json({
            statusName: 'success',
            facultys:facultys,
            amounts:amounts
        })
    }
);

// ใช้ในการเช็คจำนวนคนของทุกปีในมหาลัย
app.post('/checkAllyearInUniversity',async function(req, res) {
        let university_name = req.body.university_name
        let year = await universityInfo.getAllyearInUniversirt(university_name)
        let amount = await universityInfo.getAmountOfAllyearInUniversirt(university_name)
        let years = pushData.year(year)
        res.status(200).json({
            statusName: 'success',
            years:years,
            amounts:amount
        })
    }
);

// ใช้ในการเช็คจำนวนคนในคณะของมหาลัยต่างๆ
app.post('/checkfaculty-year',async function(req, res) {
        let year = req.body.year
        let faculty = req.body.faculty
        let university_name = await universityInfo.getDataFacultyInYear(year,faculty)
        let amount = await universityInfo.getDataFacultyInYear(year,faculty)
        let university_names = pushData.university_name(university_name)
        let amounts = pushData.amount(amount)
        res.status(200).json({
            statusName: 'success',
            university_names:university_names,
            amounts:amounts
        })
    }
);

// ใช้ในการเช็คจำนวนที่เข้าศึกษาในมหาลัยของทุกปี
app.post('/checkAllAmount-AllUniversity',async function(req, res) {
        let amount = await universityInfo.getAllAmount_AllUniversity()
        let year = await universityInfo.getYear()
        let years = pushData.year(year)
        // let amounts = pushData.sumamount(result)
        res.status(200).json({
            statusName: 'success',
            years:years,
            amounts:amount
        })
    }
);

// ใช้ในการเช็คจำนวนคนที่จะจบการศึกษาในเเต่ละปี
app.post('/checkEndAmount-Year',async function(req, res) {
        let endyear = req.body.endyear
        let year = endyear-4
        let amount = await universityInfo.getEndAmountInYear(year)
        let faculty = await universityInfo.getEndFacultyInYear(year)
        res.status(200).json({
            statusName: 'success',
            facultys:faculty,
            amounts:amount
        })
    }
);

app.get('/test',async function(req, res) {
    console.log("hi")
    var spark = new eclairjs();
    var sc = await new spark.SparkContext("local[*]", "Simple Spark Program");
    var rdd = await sc.parallelize([1.10, 2.2, 3.3, 4.4]);
    console.log(rdd)
    var rdd2 = await rdd.map(function(num) {
        return num * 2;
    });

    await rdd2.collect().then(function(results) {
        sc.stop();
        console.log(results)
    }).catch(function(err) {
        sc.stop();
        console.log(err)
    });
    }
);

// app.get('/test-mongo',async function(req, res) {
//     const dataset = new Dataset_Student();
//     dataset.id = 1;
//     dataset.year = "2559";
//     dataset.amount = 50
//     dataset.faculty = "วิศวกรรม"
//     dataset.university_name = "ลาดกระบัง"
//     const manager = getMongoManager();
//     await manager.save(dataset);
//     }
// );

app.post('/upload-dataset-student', function(req, res) {
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        const file = req.files.file;
        const filename = req.files.file.name;
        const fileName = uniqid();
        file.mv('./uploads/' + fileName + '.xls', (err) => {
            let data
            if (err)
                return res.status(500).send(err);
            exceltojson(
                {
                    input: './uploads/' + fileName + '.xls', // input xls
                    output: "Question_Key_xEng.json", // output json
                    lowerCaseHeaders: true
                },
                async function (err, result) {
                    if (err) {
                        res.status(400).json({
                            error: err,
                        })
                    } else {
                        try {
                            data = result
                            for (let i = 0; i < data.length; i++) {
                                let dataset = new Dataset_Student()
                                dataset.university_name = data[i]["university_name"]
                                dataset.faculty = data[i]["faculty"]
                                dataset.year = data[i]["year"]
                                dataset.amount = data[i]["amount"]
                                await getMongoManager().save(dataset);
                            }
                            fs.unlink('./uploads/' + fileName + '.xls', function (err) {
                                if (err) throw err;
                                res.status(200).json({
                                    statusName: 'success',
                                })
                                console.log('successfully deleted ' + './uploads/' + fileName + '.xls');
                            });
                        }
                        catch(e){
                            res.status(400).json({
                                statusName: 'error datacolumn'
                            })
                        }
                    }
                }
            )
        });
    }
);

app.post('/upload-dataset-company', function(req, res) {
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        const file = req.files.file;
        const filename = req.files.file.name;
        const fileName = uniqid();
        file.mv('./uploads/' + fileName + '.xls', (err) => {
            let data
            if (err)
                return res.status(500).send(err);
            exceltojson(
                {
                    input: './uploads/' + fileName + '.xls', // input xls
                    output: "Question_Key_xEng.json", // output json
                    lowerCaseHeaders: true
                },
                async function (err, result) {
                    if (err) {
                        res.status(400).json({
                            error: err,
                        })
                    } else {
                        try {
                            data = result
                            for (let i = 0; i < data.length; i++) {
                                let dataset = new Dataset_Company()
                                dataset.company = data[i]["company"]
                                dataset.year = data[i]["year"]
                                dataset.faculty = data[i]["faculty"]
                                dataset.salary = data[i]["salary"]
                                await getMongoManager().save(dataset);
                            }
                            fs.unlink('./uploads/' + fileName + '.xls', function (err) {
                                if (err) throw err;
                                res.status(200).json({
                                    statusName: 'success',
                                })
                                console.log('successfully deleted ' + './uploads/' + fileName + '.xls');
                            });
                        }
                        catch(e){
                            res.status(400).json({
                                statusName: 'error datacolumn'
                            })
                        }
                    }
                }
            )
        });
    }
);

export default app



