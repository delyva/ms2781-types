import { 
  CancelDeliveryOrderRequest, 
  CancelDeliveryOrderResponse,
  cancelDeliveryOrderRequestSchema,
  cancelDeliveryOrderResponseSchema 
} from '../../src/orders/cancel';

describe('Cancel Delivery Order', () => {
  const validRequest: CancelDeliveryOrderRequest = {
    trackingNumber: "TRACK123456",
    reason: "Customer requested cancellation"
  };

  const validResponse: CancelDeliveryOrderResponse = {
    trackingNumber: "TRACK123456",
    status: "approve"
  };

  const validRejectedResponse: CancelDeliveryOrderResponse = {
    trackingNumber: "TRACK123456",
    status: "reject",
    reason: "Order already in delivery"
  };

  describe('Request Validation', () => {
    test('validates a correct cancellation request', () => {
      const { error } = cancelDeliveryOrderRequestSchema.validate(validRequest);
      expect(error).toBeUndefined();
    });

    test('fails on missing required fields', () => {
      const invalidRequest = {
        trackingNumber: "TRACK123456"
        // Missing reason
      };
      const { error } = cancelDeliveryOrderRequestSchema.validate(invalidRequest);
      expect(error).toBeDefined();
    });

    test('fails on exceeding tracking number length', () => {
      const invalidRequest = {
        ...validRequest,
        trackingNumber: 'A'.repeat(36) // Max length is 35
      };
      const { error } = cancelDeliveryOrderRequestSchema.validate(invalidRequest);
      expect(error).toBeDefined();
    });

    test('fails on exceeding reason length', () => {
      const invalidRequest = {
        ...validRequest,
        reason: 'A'.repeat(513) // Max length is 512
      };
      const { error } = cancelDeliveryOrderRequestSchema.validate(invalidRequest);
      expect(error).toBeDefined();
    });
  });

  describe('Response Validation', () => {
    test('validates a correct approval response', () => {
      const { error } = cancelDeliveryOrderResponseSchema.validate(validResponse);
      expect(error).toBeUndefined();
    });

    test('validates a correct rejection response', () => {
      const { error } = cancelDeliveryOrderResponseSchema.validate(validRejectedResponse);
      expect(error).toBeUndefined();
    });

    test('validates alphabetic only status values', () => {
      const validStatuses = [
        "approve",
        "reject",
        "cancelled",
        "processing",
        "completed"
      ];

      const invalidStatuses = [
        "cancel123",         // Contains numbers
        "cancel_request",    // Contains underscore
        "CANCEL-REQUEST",    // Contains hyphen
        "status@cancel",     // Contains special character
        "123"               // Only numbers
      ];

      // Test valid statuses
      validStatuses.forEach(status => {
        const response = {
          trackingNumber: "TRACK123456",
          status
        };
        const { error } = cancelDeliveryOrderResponseSchema.validate(response);
        expect(error).toBeUndefined();
      });

      // Test invalid statuses
      invalidStatuses.forEach(status => {
        const response = {
          trackingNumber: "TRACK123456",
          status
        };
        const { error } = cancelDeliveryOrderResponseSchema.validate(response);
        expect(error).toBeDefined();
      });
    });

    test('fails on exceeding tracking number length in response', () => {
      const invalidResponse = {
        ...validResponse,
        trackingNumber: 'A'.repeat(36) // Max length is 35
      };
      const { error } = cancelDeliveryOrderResponseSchema.validate(invalidResponse);
      expect(error).toBeDefined();
    });

    test('fails on exceeding status length', () => {
      const invalidResponse = {
        trackingNumber: "TRACK123456",
        status: 'A'.repeat(36) // Max length is 35
      };

      const { error } = cancelDeliveryOrderResponseSchema.validate(invalidResponse);
      expect(error).toBeDefined();
    });

    test('fails on exceeding reason length in rejection', () => {
      const invalidResponse = {
        trackingNumber: "TRACK123456",
        status: "reject",
        reason: 'A'.repeat(513) // Max length is 512
      };
      const { error } = cancelDeliveryOrderResponseSchema.validate(invalidResponse);
      expect(error).toBeDefined();
    });
  });
});