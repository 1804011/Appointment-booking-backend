import { RequestHandler } from 'express'
import { appointmentServices } from './appointment.service'

const createAppointmentController: RequestHandler = async (req, res) => {
  try {
    const { slotId } = req.body

    const appointment = await appointmentServices.createAppointment(slotId)
    res.status(200).send({
      status: true,
      message: 'Appointment created successfully',
      data: appointment,
    })
  } catch (error) {
    res.status(500).send({
      status: false,
      message: 'Appointment creation failed',
      errors: [error.message],
    })
  }
}
const startAppointmentController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    await appointmentServices.startAppointment(id)
    res.status(200).json({
      status: true,
      message: 'appointment started successfully',
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Appointment starting failed',
      errors: [error.message],
    })
  }
}
const closeAppointmentController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = await appointmentServices.closeAppointment(id)
    res.status(200).json({
      status: true,
      message: 'appoinment closed successfully',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'appoinment closing failed',
      errors: [error.message],
    })
  }
}
const deleteAppointmentController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = await appointmentServices.deleteAppoinment(id)
    res.status(200).json({
      status: true,
      message: 'appointment deleted successfully',
      data,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'appointment deletion failed',
      errors: [error.message],
    })
  }
}
const getAppointmentsController: RequestHandler = async (req, res) => {
  try {
    const result = await appointmentServices.getAppointments()
    res.status(200).json({
      status: true,
      message: 'appointments found successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'appointments retreiving failed',
      errors: [error?.message],
    })
  }
}
const getUpcomingAppointmentsController: RequestHandler = async (req, res) => {
  try {
    const { date } = req.body
    const result = await appointmentServices.getUpcomingAppointment(date)
    res.status(200).json({
      status: 200,
      message: 'todays appointments found successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      status: 200,
      message: 'todays appointments are not found successfully',
      errors: [error.message],
    })
  }
}
export const appointmentControllers = {
  createAppointmentController,
  startAppointmentController,
  closeAppointmentController,
  deleteAppointmentController,
  getAppointmentsController,
  getUpcomingAppointmentsController,
}
