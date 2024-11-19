import { MS2781Joi as Joi } from '../../common/validation';

/**
 * Validation schema for location information
 * @constant
 */
const locationSchema = Joi.object({
  address: Joi.string().max(255).required()
    .alphanumeric()
    .description('Primary address line'),
  address2: Joi.string().max(255)
    .alphanumeric()
    .description('Secondary address line'),
  address3: Joi.string().max(255)
    .alphanumeric()
    .description('Tertiary address line'),
  postcode: Joi.string().max(10).required()
    .alphanumeric()
    .description('Postal code'),
  city: Joi.string().max(35).required()
    .alphanumeric()
    .description('City name'),
  state: Joi.string().max(35)
    .alphanumeric()
    .description('State or province'),
  country: Joi.string().length(2).uppercase()
    .alphanumeric()
    .description('Two-letter country code')
});

/**
 * Validation schema for contact person information
 * @constant
 */
const contactPersonSchema = Joi.object({
  contactName: Joi.string().max(128).required()
    .alphanumeric()
    .description('Name of contact person or company'),
  contactNumber: Joi.string().max(25).required()
    .phoneNumber()
    .pattern(/^\+\d{10,}$/)
    .description('Contact number with country code'),
  contactEmail: Joi.string().max(64)
    .email({ tlds: { allow: false } })
    .description('Email address'),
  companyName: Joi.string().max(128)
    .alphanumeric()
    .description('Company name'),
  location: locationSchema.required()
    .description('Location details')
});

/**
 * Validation schema for parcel weight
 * @constant
 */
const parcelWeightSchema = Joi.object({
  unit: Joi.string().valid('kg', 'g').required()
    .alphabetic()
    .description('Weight unit (kg or g)'),
  parcelWeight: Joi.number().precision(3).positive().required()
    .description('Weight value, decimal(7,3)')
});

/**
 * Validation schema for parcel dimensions
 * @constant
 */
const parcelDimensionSchema = Joi.object({
  unit: Joi.string().valid('m', 'cm').required()
    .alphabetic()
    .description('Dimension unit (m or cm)'),
  width: Joi.number().precision(3).positive().required()
    .description('Width value, decimal(5,3)'),
  length: Joi.number().precision(3).positive().required()
    .description('Length value, decimal(5,3)'),
  height: Joi.number().precision(3).positive().required()
    .description('Height value, decimal(5,3)')
});

/**
 * Validation schema for delivery service information
 * @constant
 */
const deliveryServiceSchema = Joi.object({
  serviceType: Joi.string().max(45).required()
    .alphanumeric()
    .description('Type of delivery service'),
  pickupDateTime: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .description('Pickup date and time (YYYY-MM-DD HH:mm:ss)'),
  requestDateTime: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .description('Requested delivery date and time (YYYY-MM-DD HH:mm:ss)')
});

/**
 * Main validation schema for create delivery order request
 * @constant
 */
export const deliveryOrderRequestSchema = Joi.object({
  orderNumber: Joi.string().max(64).required()
    .alphanumeric()
    .description('Order reference number'),
  sender: contactPersonSchema.required()
    .description('Sender information'),
  receiver: contactPersonSchema.required()
    .description('Receiver information'),
  parcel: Joi.object({
    quantity: Joi.number().integer().max(9999999999)
      .description('Quantity of parcels'),
    orderRemarks: Joi.string().max(512)
      .alphanumeric()
      .description('Additional remarks'),
    weight: parcelWeightSchema
      .description('Weight information'),
    dimension: parcelDimensionSchema
      .description('Dimension information')
  }).description('Parcel details'),
  deliveryService: deliveryServiceSchema
    .description('Delivery service details')
});

/**
 * Validation schema for delivery cost
 * @constant
 */
const deliveryCostSchema = Joi.object({
  currency: Joi.string().length(3)
    .alphabetic()
    .description('Three-letter currency code'),
  amount: Joi.number().precision(2).required()
    .description('Cost amount, decimal(10,2)')
});

/**
 * Validation schema for create delivery order response
 * @constant
 */
export const deliveryOrderResponseSchema = Joi.object({
  orderNumber: Joi.string().max(64).required()
    .alphanumeric()
    .description('Order reference number'),
  deliveryService: Joi.object({
    status: Joi.string().required()
      .alphanumeric()
      .description('Delivery creation status'),
    createdDateTime: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      .description('Creation date and time (YYYY-MM-DD HH:mm:ss)'),
    trackingNumber: Joi.string().max(35).required()
      .alphanumeric()
      .description('Tracking number'),
    deliveryCost: deliveryCostSchema
      .description('Delivery service cost')
  }).required()
    .description('Delivery service response details')
});