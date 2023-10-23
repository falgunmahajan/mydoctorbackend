const supertest=require("supertest");
const SequelizeMock=require("sequelize-mock")
const { app, createModel, server } = require("../app");
const req=supertest(app);
let sequelizeMock;
const doctors=[
    {
        "Id": "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
        "userId": "b07188c7-1ffe-481f-8d88-31d225844607",
        "languages": [
            {
                "name": "English (India)",
                "code": "en-IN"
            },
            {
                "name": "Hindi - हिन्दी",
                "code": "hi"
            }
        ],
        "bio": "Hello This is Doctor. My qualification is MBBS, Phd",
        "image": "/assests/images/uploads/venues.jpg",
        "Qualification": [
            {
                "degree": "Phd",
                "institute": "abc institute",
                "year": "1995"
            },
            {
                "degree": "MBBS",
                "institute": "xyz institute",
                "year": "1998"
            }
        ],
        "licenceNumber": "hgdhef",
        "experience": [
            {
                "position": "Psychiatrist",
                "hospitalName": "abc hospital",
                "startDate": "2017-05",
                "endDate": "2021-08"
            },
            {
                "position": "Psychiatrist",
                "hospitalName": "xyz hospital",
                "startDate": "2021-08",
                "endDate": "2022-08",
                "startErr": "",
                "endErr": ""
            }
        ],
        "createdAt": "2023-10-16T08:22:40.562Z",
        "updatedAt": "2023-10-21T11:05:39.814Z",
        "user": {
            "Id": "b07188c7-1ffe-481f-8d88-31d225844607",
            "firstName": "Dr. Falgun ",
            "lastName": "Mahajan",
            "email": "falgunmahajan1999@gmail.com",
            "contactNumber": "4234642665",
            "password": "$2a$10$1QhAVLfcNv2HbSQKrVX0yOv7ccyiY/qu4XxyxNypBG3/jn93peQLG",
            "gender": "male",
            "role": "doctor",
            "enabled": true,
            "deleted": false,
            "createdAt": "2023-10-16T08:22:40.502Z",
            "updatedAt": "2023-10-16T08:22:40.502Z"
        },
        "specialities": [
            {
                "Id": "44161e14-1a21-4449-835b-782e58bf0b33",
                "name": "Child & Adolescent Psychiatry",
                "enabled": true,
                "reviewed": true,
                "deleted": false,
                "imageUrl": "/assests/images/specialities/c/child & adolescent psychiatry.svg",
                "createdAt": "2023-10-04T05:40:39.691Z",
                "updatedAt": "2023-10-04T05:40:39.691Z",
                "doctorSpecialityMapping": {
                    "Id": "4a5aa7be-1594-4ad3-af62-7a195085e0cd",
                    "doctorId": "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
                    "specialityId": "44161e14-1a21-4449-835b-782e58bf0b33",
                    "createdAt": "2023-10-21T06:25:25.331Z",
                    "updatedAt": "2023-10-21T06:25:25.331Z"
                }
            },
            {
                "Id": "8d607e37-473e-4495-b629-69b3bbcb73d7",
                "name": "Cosmetology",
                "enabled": true,
                "reviewed": true,
                "deleted": false,
                "imageUrl": "/assests/images/specialities/c/cosmetology.svg",
                "createdAt": "2023-10-04T05:40:39.691Z",
                "updatedAt": "2023-10-04T05:40:39.691Z",
                "doctorSpecialityMapping": {
                    "Id": "d389075d-768f-4b56-9cc5-71cd00add0c3",
                    "doctorId": "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
                    "specialityId": "8d607e37-473e-4495-b629-69b3bbcb73d7",
                    "createdAt": "2023-10-21T06:25:32.611Z",
                    "updatedAt": "2023-10-21T06:25:32.611Z"
                }
            }
        ],
        "hospitals": [
            {
                "Id": "e96c43a9-d405-42b8-b296-8c4b9742bd23",
                "hospitalName": "Xyz Hospital",
                "email": "xyz@gmail.com",
                "contactNumber": "5436537858",
                "password": "$2a$10$fBGV8hp/b4BKTOdY6m7INe.tx5k2qbM96lALcdCJweDxshpCkYt66",
                "location": "Bakshi Nagar",
                "enabled": true,
                "deleted": false,
                "createdAt": "2023-10-21T07:46:12.374Z",
                "updatedAt": "2023-10-21T07:46:12.374Z",
                "hospitalDoctorMapping": {
                    "Id": "812c72c4-2e3f-42cb-9281-1b16a4aab56c",
                    "hospitalId": "e96c43a9-d405-42b8-b296-8c4b9742bd23",
                    "doctorId": "64e4e9cb-69a0-4f2f-b0e7-6c5bf51e40d8",
                    "consultationFee": 300,
                    "position": "Physician",
                    "createdAt": "2023-10-21T11:27:43.404Z",
                    "updatedAt": "2023-10-21T11:47:53.618Z"
                }
            }
        ]
    }
]
beforeAll(async()=>{
    await createModel();
    sequelizeMock=new SequelizeMock()
})
afterEach(async()=>{
    await server.close()
     })
     describe("Doctors api",()=>{
        test("Get all doctors",async()=>{
            const res=await req.get("/doctors")
            expect(res.status).toBe(200);
            expect(res.body).toEqual(doctors)
        })
     })