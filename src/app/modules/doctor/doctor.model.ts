import { Schema, model } from 'mongoose'
import IDoctor, { DoctorModel } from './doctor.interface'

const doctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 125,
    },
    academicQualifications: [
      {
        degree: {
          type: String,
          required: true,
        },
        institute: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)
doctorSchema.pre('save', async function (next) {
  const doctor = await Doctor.findOne({})
  if (!doctor) next()
  else {
    throw new Error('Doctor already exists')
  }
})
const Doctor = model<IDoctor, DoctorModel>('Doctor', doctorSchema)
export default Doctor
