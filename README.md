# ms2781-types

TypeScript type definitions and Joi validation schemas for Malaysian Standard MS 2781:2023 - Logistics Data for E-Commerce.

## Description

This package provides TypeScript interfaces and Joi validation schemas that implement the data specifications defined in MS 2781:2023. This standard was developed by the Department of Standards Malaysia to create data consistency across e-commerce logistics systems.

## Features

- 🏗️ TypeScript interfaces following MS 2781:2023 specifications
- ✅ Joi validation schemas matching standard requirements
- 📦 Covers all core operations:
  - Create Delivery Order
  - Update Delivery Status
  - Cancel Delivery Order
- 📝 JSDoc documentation

## Usage

```typescript
import { DeliveryOrderRequest, deliveryOrderRequestSchema } from 'ms2781-types';

// Create delivery order following MS 2781:2023 specification
const request: DeliveryOrderRequest = {
  orderNumber: "ORDER123",
  sender: {
    contactName: "John Doe",
    contactNumber: "+60123456789",
    location: {
      address: "123 Sender Street",
      postcode: "12345",
      city: "Sender City"
    }
  },
  // ... other fields as per MS 2781:2023
};

// Validate against MS 2781:2023 requirements
const { error, value } = deliveryOrderRequestSchema.validate(request);
```

## Standard Reference

This package implements type definitions and validations based on:
- Standard: MS 2781:2023
- Title: Logistics Data for E-Commerce
- Authority: Department of Standards Malaysia

Note: This package provides only type definitions and validations. For the full standard specification, please refer to the official MS 2781:2023 documentation from Department of Standards Malaysia.

## License

MIT

## Keywords
- typescript
- malaysia-standard
- ms2781
- e-commerce
- logistics
- type-definitions
- validation
- logistics-data