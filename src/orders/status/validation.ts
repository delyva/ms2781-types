import { MS2781Joi as Joi } from '../../common/validation';

/**
 * Date-time format pattern for validation
 * Format: YYYY-MM-DD HH:mm:ss
 * @constant
 */
const DATE_TIME_FORMAT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

/**
 * Validation schema for parcel location information
 * Based on MS 2781:2023 Section 6.2.2
 * @constant
 */
export const parcelLocationSchema = Joi.object({
  hubLocation: Joi.string()
    .max(128)
    .alphanumeric()
    .required()
    .description('Current location of the parcel'),
    
  dateTime: Joi.string()
    .pattern(DATE_TIME_FORMAT)
    .required()
    .description('Date and time of location update (YYYY-MM-DD HH:mm:ss)')
});

/**
 * Validation schema for recipient information
 * Based on MS 2781:2023 Section 6.2.2
 * @constant
 */
export const recipientInfoSchema = Joi.object({
  receivedBy: Joi.string()
    .max(255)
    .alphanumeric()
    .required()
    .description('Identity of the receiver (NRIC/name/photo URL)'),
    
  receivedDateTime: Joi.string()
    .pattern(DATE_TIME_FORMAT)
    .required()
    .description('Date and time of receipt (YYYY-MM-DD HH:mm:ss)')
});

/**
 * Validation schema for update delivery status request
 * Based on MS 2781:2023 Section 6.2.1
 * @constant
 */
export const updateDeliveryStatusRequestSchema = Joi.object({
  deliveryService: Joi.object({
    trackingNumber: Joi.string()
      .max(35)
      .alphanumeric()
      .required()
      .description('Tracking number for the delivery')
  }).optional()
    .description('Delivery service information')
});

/**
 * Validation schema for update delivery status response
 * Based on MS 2781:2023 Section 6.2.2
 * @constant
 */
export const updateDeliveryStatusResponseSchema = Joi.object({
  trackingNumber: Joi.string()
    .max(35)
    .alphanumeric()
    .required()
    .description('Tracking number for the delivery'),
    
  deliveryStatus: Joi.object({
    status: Joi.string()
      .alphanumeric()
      .required()
      .description('Current delivery status'),
      
    pickupDateTime: Joi.string()
      .pattern(DATE_TIME_FORMAT)
      .required()
      .description('Pickup date and time (YYYY-MM-DD HH:mm:ss)'),
      
    recipientInfo: recipientInfoSchema
      .optional()
      .description('Information about the recipient'),
      
    parcelLocation: parcelLocationSchema
      .optional()
      .description('Current location information of the parcel')
  }).required()
    .description('Delivery status details')
});