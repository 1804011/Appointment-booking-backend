import { RequestHandler } from 'express'
import { patientServices } from './patient.service'

const createPatientController: RequestHandler = async (req, res) => {
  await patientServices
    .createPatientService(req.body)
    .then(() => {
      res.status(200).json({
        status: true,
        message: 'patient created successfully',
      })
    })
    .catch(err =>
      res.status(500).json({
        status: false,
        message: 'patient creation failed!!',
        errors: err,
      }),
    )
}
const updatedPatientController: RequestHandler = async (req, res) => {
  try {
    const { phoneNo } = req.decoded
    const data = await patientServices.updatePatientProfile(phoneNo, req.body)
    res.status(200).json({
      status: true,
      message: 'patient update successfully',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'patient update failed',
      errors: [error.message],
    })
  }
}
const getPatientProfileController: RequestHandler = async (req, res) => {
  try {
    const { phoneNo } = req.decoded
    const data = await patientServices.getPatientProfile(phoneNo)
    res.status(200).json({
      status: true,
      message: 'patient profile retreiving successull',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'patient profile finding failed',
      errors: [error.message],
    })
  }
}

const getDoctorProfileController: RequestHandler = async (req, res) => {
  try {
    const data = await patientServices.getDoctorProfile()
    res.status(200).json({
      status: true,
      message: 'doctor profile retreived successfully',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'doctor profile retreiving failed',
      errors: [error.message],
    })
  }
}

export const patientControllers = {
  createPatientController,
  updatedPatientController,
  getPatientProfileController,
  getDoctorProfileController,
}
