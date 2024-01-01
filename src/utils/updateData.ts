import { Op } from "sequelize";
import { doctorSpecialityMapping } from "../models/doctorSpecialityMapping";
import { doctorAttributes, doctors } from "../models/doctors";
import {  hospitalDoctorMapping } from "../models/hospitalDoctorMapping";
import { specialityAttributes } from "../models/speciality";
import { profileAttributes } from "../interfaces/doctorProfessional";
import { user, userAttributes } from "../models/users";
import { patientAttributes } from "../models/patient";


const updateDoctorProfile = async (data:doctorAttributes) => {
  
    return await doctors.update(data, {
      where: {
        userId: data.userId,
      },
    });
  
};
interface UpdateUserAttributes extends userAttributes{
  userId:string
}
const updateUser=async(data:UpdateUserAttributes)=>{
  return await user.update(
    data,
     {
       where: {
         Id: data.userId,
       },
     }
   );
}

const updateSpecialities = async (data: { specialities: specialityAttributes[]; doctorId: string; }) => {
 
    data.specialities.map(async (item) => {
      const record = await doctorSpecialityMapping.findOne({
        where: { doctorId: data.doctorId, specialityId: item.Id },
      });
      if (!record) {
        return await doctorSpecialityMapping.create({
          doctorId: data.doctorId,
          specialityId: item.Id,
        });
      }
    });
    const specialityId = data.specialities.map((item) => item.Id);
    doctorSpecialityMapping.destroy({
      where: {
        doctorId: data.doctorId,
        specialityId: {
          [Op.notIn]: specialityId,
        },
      },
    });
 
};

const updateProfessional = async (data: { profile:string ; doctorId: string; }) => {
 
    const profile :Array<profileAttributes>= JSON.parse(data.profile);
    console.log(profile);
    profile.map(async (item) => {
      const record = await hospitalDoctorMapping.findOne({
        where: { doctorId: data.doctorId, hospitalId: item.hospital.Id },
      });
      if (!record) {
        return await hospitalDoctorMapping.create({
          doctorId: data.doctorId,
          hospitalId: item.hospital.Id,
          consultationFee: item.consultationFee,
          position: item.position,
        });
      } else {
        await hospitalDoctorMapping.update(
          {
            consultationFee: item.consultationFee,
            position: item.position,
          },
          {
            where: {
              doctorId: data.doctorId,
              hospitalId: item.hospital.Id,
            },
          }
        );
      }
      const hospitalId = profile.map((item) => item.hospital.Id);
      hospitalDoctorMapping.destroy({
        where: {
          doctorId: data.doctorId,
          hospitalId: {
            [Op.notIn]: hospitalId,
          },
        },
      });
    });
  
};
export{
  updateDoctorProfile,
  updateSpecialities,
  updateProfessional,
  updateUser
};
