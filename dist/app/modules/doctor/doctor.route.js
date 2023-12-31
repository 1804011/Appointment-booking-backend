'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const slot_validator_1 = require('./slot/slot.validator')
const slot_controller_1 = require('./slot/slot.controller')
const auth_middleware_1 = require('../../middlewares/auth.middleware')
const appointment_validator_1 = __importDefault(
  require('./appointment/appointment.validator'),
)
const appointment_controller_1 = require('./appointment/appointment.controller')
const patientQueue_controller_1 = require('../patient-queue/patientQueue.controller')
const booking_validator_1 = require('../patient/booking/booking.validator')
const booking_controller_1 = require('../patient/booking/booking.controller')
const doctor_controller_1 = require('./doctor.controller')
const doctor_validator_1 = require('./doctor.validator')
const doctorRoutes = express_1.default.Router()
doctorRoutes.use(
  auth_middleware_1.authMiddlewares.verifyTokenMiddleware,
  auth_middleware_1.authMiddlewares.verifyUser('doctor'),
)
doctorRoutes.post(
  '/slot',
  slot_validator_1.slotValidators.validateSlot,
  slot_controller_1.slotControllers.createSlotController,
)
doctorRoutes.get('/slots', slot_controller_1.slotControllers.getSlotsController)
doctorRoutes.delete(
  '/slot/:id',
  slot_controller_1.slotControllers.deleteSlotController,
)
doctorRoutes.post(
  '/appointment',
  appointment_validator_1.default,
  appointment_controller_1.appointmentControllers.createAppointmentController,
)
doctorRoutes.patch(
  '/appointment/start-appointment/:id',
  appointment_controller_1.appointmentControllers.startAppointmentController,
)
doctorRoutes.patch(
  '/appointment/close-appointment/:id',
  appointment_controller_1.appointmentControllers.closeAppointmentController,
)
doctorRoutes.delete(
  '/appointment/:id',
  appointment_controller_1.appointmentControllers.deleteAppointmentController,
)
doctorRoutes.get(
  '/appointments',
  appointment_controller_1.appointmentControllers.getAppointmentsController,
)
doctorRoutes.get(
  '/patient-queue/:id',
  patientQueue_controller_1.patientQueueControllers.getQueuedPatientController,
)
doctorRoutes.patch(
  '/booking/:id',
  booking_validator_1.bookingValidators.validateServiceStatus,
  booking_controller_1.bookingControllers.updateBookingStatusController,
)
doctorRoutes.put(
  '/profile',
  doctor_validator_1.doctorValidators.updateDoctorValidation,
  doctor_controller_1.doctorControllers.updateDoctorController,
)
//doctorRoutes.put('/slot/:id', slotControllers.updateSlotController)
exports.default = doctorRoutes
