import { MS2781Joi as Joi } from '../../common/validation';

/**
 * Validation schema for cancel delivery order request
 * Validates the request against MS 2781:2023 Section 6.3.1 specifications
 * @constant
 */
export const cancelDeliveryOrderRequestSchema = Joi.object({
  trackingNumber: Joi.string()
    .max(35)
    .alphanumeric()
    .required()
    .description('Tracking number from the original delivery order'),
    
  reason: Joi.string()
    .max(512)
    .alphanumeric()
    .required()
    .description('Reason for cancellation request')
});

/**
 * Validation schema for cancel delivery order response
 * Validates the response against MS 2781:2023 Section 6.3.2 specifications
 * @constant
 */
export const cancelDeliveryOrderResponseSchema = Joi.object({
  trackingNumber: Joi.string()
    .max(35)
    .alphanumeric()
    .required()
    .description('Tracking number of the cancelled order'),
    
  status: Joi.string()
    .max(35)
    .alphabetic()
    .required()
    .description('Status of the cancellation request'),
    
  reason: Joi.string()
    .max(512)
    .alphanumeric()
    .optional()
    .description('Reason for rejection (required when status is reject)')
});