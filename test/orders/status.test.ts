import { 
  UpdateDeliveryStatusRequest,
  UpdateDeliveryStatusResponse,
  updateDeliveryStatusRequestSchema,
  updateDeliveryStatusResponseSchema
} from '../../src/orders/status';

describe('Update Delivery Status', () => {
  const validRequest: UpdateDeliveryStatusRequest = {
    deliveryService: {
      trackingNumber: "TRACK123456"
    }
  };

  const validResponse: UpdateDeliveryStatusResponse = {
    trackingNumber: "TRACK123456",
    deliveryStatus: {
      status: 'In Transit',
      pickupDateTime: "2023-04-14 18:00:00",
      parcelLocation: {
        hubLocation: "Central Hub",
        dateTime: "2023-04-14 20:00:00"
      }
    }
  };

  test('validates a correct status request', () => {
    const { error } = updateDeliveryStatusRequestSchema.validate(validRequest);
    expect(error).toBeUndefined();
  });

  test('validates a correct status response', () => {
    const { error } = updateDeliveryStatusResponseSchema.validate(validResponse);
    expect(error).toBeUndefined();
  });

  test('fails on invalid datetime format', () => {
    const invalidResponse = {
      ...validResponse,
      deliveryStatus: {
        ...validResponse.deliveryStatus,
        pickupDateTime: "2023-04-14" // Invalid format
      }
    };
    const { error } = updateDeliveryStatusResponseSchema.validate(invalidResponse);
    expect(error).toBeDefined();
  });

  test('fails on invalid status value', () => {
    const invalidResponse = {
      ...validResponse,
      deliveryStatus: {
        ...validResponse.deliveryStatus,
        status: 'INVALID_STATUS'
      }
    };
    const { error } = updateDeliveryStatusResponseSchema.validate(invalidResponse);
    expect(error).toBeDefined();
  });
});