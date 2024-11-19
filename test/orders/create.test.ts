import { 
  DeliveryOrderRequest, 
  DeliveryOrderResponse,
  ParcelWeight,
  ParcelDimension,
  deliveryOrderRequestSchema,
  deliveryOrderResponseSchema
} from '../../src/orders/create';

describe('Create Delivery Order', () => {
  const validRequest: DeliveryOrderRequest = {
    orderNumber: "ORDER123",
    sender: {
      contactName: "John Doe",
      contactNumber: "+60123456789",
      contactEmail: "john@example.com",  // Testing optional fields
      companyName: "Sender Corp",
      location: {
        address: "123 Sender Street",
        address2: "Unit 4",  // Testing optional address fields
        address3: "Block B",
        postcode: "12345",
        city: "Sender City",
        state: "Sender State",
        country: "MY"
      }
    },
    receiver: {
      contactName: "Jane Doe",
      contactNumber: "+60123456788",
      location: {
        address: "456 Receiver Street",
        postcode: "54321",
        city: "Receiver City"
      }
    },
    // Testing optional parcel information
    parcel: {
      quantity: 2,
      orderRemarks: "Handle with care",
      weight: {
        unit: "kg",
        parcelWeight: 1.234
      },
      dimension: {
        unit: "cm",
        width: 12.345,
        length: 23.456,
        height: 34.567
      }
    },
    // Testing optional delivery service
    deliveryService: {
      serviceType: "same day delivery",
      pickupDateTime: "2023-04-14 18:00:00",
      requestDateTime: "2023-04-14 20:00:00"
    }
  };

  const validResponse: DeliveryOrderResponse = {
    orderNumber: "ORDER123",
    deliveryService: {
      status: 'Created',
      createdDateTime: "2023-04-14 18:00:00",
      trackingNumber: "TRACK123456",
      deliveryCost: {
        currency: "MYR",
        amount: 123.45
      }
    }
  };

  describe('Request Validation', () => {
    test('validates a correct delivery order request', () => {
      const { error } = deliveryOrderRequestSchema.validate(validRequest);
      expect(error).toBeUndefined();
    });

    test('validates minimal required fields', () => {
      const minimalRequest = {
        orderNumber: "ORDER123",
        sender: {
          contactName: "John Doe",
          contactNumber: "+60123456789",
          location: {
            address: "123 Street",
            postcode: "12345",
            city: "City"
          }
        },
        receiver: {
          contactName: "Jane Doe",
          contactNumber: "+60123456788",
          location: {
            address: "456 Street",
            postcode: "54321",
            city: "City"
          }
        }
      };
      const { error } = deliveryOrderRequestSchema.validate(minimalRequest);
      expect(error).toBeUndefined();
    });

    test('fails on invalid phone number format', () => {
      const invalidRequest = {
        ...validRequest,
        sender: {
          ...validRequest.sender,
          contactNumber: '123456789' // Missing + prefix
        }
      };
      const { error } = deliveryOrderRequestSchema.validate(invalidRequest);
      expect(error).toBeDefined();
    });

    test('fails on exceeding maximum length constraints', () => {
      const invalidRequest = {
        ...validRequest,
        orderNumber: 'A'.repeat(65) // Max length is 64
      };
      const { error } = deliveryOrderRequestSchema.validate(invalidRequest);
      expect(error).toBeDefined();
    });

    test('validates parcel weight formats', () => {
      const weights: ParcelWeight[] = [
        { unit: 'kg', parcelWeight: 1.234 },
        { unit: 'g', parcelWeight: 1234.567 }
      ];
      
      weights.forEach(weight => {
        const requestWithWeight = {
          ...validRequest,
          parcel: { ...validRequest.parcel, weight }
        };
        const { error } = deliveryOrderRequestSchema.validate(requestWithWeight);
        expect(error).toBeUndefined();
      });
    });

    test('validates parcel dimension formats', () => {
      const dimensions: ParcelDimension[] = [
        { unit: 'm', width: 1.234, length: 2.345, height: 3.456 },
        { unit: 'cm', width: 12.345, length: 23.456, height: 34.567 }
      ];
      
      dimensions.forEach(dimension => {
        const requestWithDimension = {
          ...validRequest,
          parcel: { ...validRequest.parcel, dimension }
        };
        const { error } = deliveryOrderRequestSchema.validate(requestWithDimension);
        expect(error).toBeUndefined();
      });
    });
  });

  describe('Response Validation', () => {
    test('validates a correct delivery order response', () => {
      const { error } = deliveryOrderResponseSchema.validate(validResponse);
      expect(error).toBeUndefined();
    });

    test('validates response with minimal fields', () => {
      const minimalResponse = {
        orderNumber: "ORDER123",
        deliveryService: {
          status: 'Created',
          trackingNumber: "TRACK123456"
        }
      };
      const { error } = deliveryOrderResponseSchema.validate(minimalResponse);
      expect(error).toBeUndefined();
    });
  });
});