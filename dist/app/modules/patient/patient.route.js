'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const auth_middleware_1 = require('../../middlewares/auth.middleware')
const booking_controller_1 = require('./booking/booking.controller')
const appointment_controller_1 = require('../doctor/appointment/appointment.controller')
const patient_controller_1 = require('./patient.controller')
const patient_validator_1 = require('./patient.validator')
const slot_controller_1 = require('../doctor/slot/slot.controller')
const patientQueue_controller_1 = require('../patient-queue/patientQueue.controller')
const patientRoutes = express_1.default.Router()
patientRoutes.use(
  auth_middleware_1.authMiddlewares.verifyTokenMiddleware,
  auth_middleware_1.authMiddlewares.verifyUser('patient'),
)
patientRoutes.post(
  '/booking/:id',
  booking_controller_1.bookingControllers.createBookingController,
)
patientRoutes.get(
  '/booking/:id',
  booking_controller_1.bookingControllers.checkBookingController,
)
patientRoutes.get(
  '/appointments',
  appointment_controller_1.appointmentControllers
    .getUpcomingAppointmentsController,
)
patientRoutes.patch(
  '/profile',
  patient_validator_1.patientValidators.validatePatient,
  patient_controller_1.patientControllers.updatedPatientController,
)
patientRoutes.get(
  '/profile',
  patient_controller_1.patientControllers.getPatientProfileController,
)
patientRoutes.get(
  '/doctor-info',
  patient_controller_1.patientControllers.getDoctorProfileController,
)
patientRoutes.get(
  '/slots',
  slot_controller_1.slotControllers.getSlotsOfDayController,
)
patientRoutes.get(
  '/patient-queue/:id',
  patientQueue_controller_1.patientQueueControllers.getQueuedPatientController,
)
exports.default = patientRoutes
