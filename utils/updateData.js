const { Op } = require("sequelize");

const { doctors } = require("../models/doctors");
const {
  doctorSpecialityMapping,
} = require("../models/doctorSpecialityMapping");
const { hospitalDoctorMapping } = require("../models/hospitaldoctormapping");

const updateDoctorProfile = async (data) => {
  try {
    return await doctors.update(data, {
      where: {
        userId: data.userId,
      },
    });
  } catch (err) {
    return err;
  }
};

const updateSpecialities = async (data) => {
  try {
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
  } catch (error) {
    return error;
  }
};

const updateProfessional = async (data) => {
  try {
    const profile = JSON.parse(data.profile);
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
  } catch (error) {
    return error;
  }
};
module.exports = {
  updateDoctorProfile,
  updateSpecialities,
  updateProfessional,
};
