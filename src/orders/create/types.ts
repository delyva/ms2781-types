/**
 * Represents the physical location details for a contact
 * @interface Location
 */
export interface Location {
  /** Primary address line, maximum 255 characters */
  address: string;
  /** Secondary address line, maximum 255 characters */
  address2?: string;
  /** Tertiary address line, maximum 255 characters */
  address3?: string;
  /** Postal code, maximum 10 characters */
  postcode: string;
  /** City name, maximum 35 characters */
  city: string;
  /** State or province name, maximum 35 characters */
  state?: string;
  /** Two-letter country code (e.g., 'MY' for Malaysia) */
  country?: string;
}
/**
 * Represents a contact person's information for sender or receiver
 * @interface ContactPerson
 */
export interface ContactPerson {
  /** Name of contact person or company, maximum 128 characters */
  contactName: string;
  /** Contact number with country code (e.g., +60123456789), maximum 25 characters */
  contactNumber: string;
  /** Optional email address, maximum 64 characters */
  contactEmail?: string;
  /** Optional company name, maximum 128 characters */
  companyName?: string;
  /** Location details */
  location: Location;
}

/**
 * Represents the weight details of a parcel
 * @interface ParcelWeight
 */
export interface ParcelWeight {
  /** Unit of measurement for weight */
  unit: 'kg' | 'g';
  /** Weight value in specified unit, decimal(7,3) */
  parcelWeight: number;
}

/**
 * Represents the dimensional measurements of a parcel
 * @interface ParcelDimension
 */
export interface ParcelDimension {
  /** Unit of measurement for dimensions */
  unit: 'm' | 'cm';
  /** Width in specified unit, decimal(5,3) */
  width: number;
  /** Length in specified unit, decimal(5,3) */
  length: number;
  /** Height in specified unit, decimal(5,3) */
  height: number;
}

/**
 * Represents delivery service specifications
 * @interface DeliveryService
 */
export interface DeliveryService {
  /** Type of delivery service, maximum 45 characters */
  serviceType: string;
  /** Optional pickup date and time in format YYYY-MM-DD HH:mm:ss */
  pickupDateTime?: string;
  /** Optional requested delivery date and time in format YYYY-MM-DD HH:mm:ss */
  requestDateTime?: string;
}

/**
 * Represents a complete delivery order request
 * @interface DeliveryOrderRequest
 */
export interface DeliveryOrderRequest {
  /** Order reference number, maximum 64 characters */
  orderNumber: string;
  /** Sender's information */
  sender: ContactPerson;
  /** Receiver's information */
  receiver: ContactPerson;
  /** Optional parcel details */
  parcel?: {
    /** Quantity of parcels in the order, maximum 10 digits */
    quantity?: number;
    /** Additional remarks, maximum 512 characters */
    orderRemarks?: string;
    /** Weight information */
    weight?: ParcelWeight;
    /** Dimension information */
    dimension?: ParcelDimension;
  };
  /** Optional delivery service details */
  deliveryService?: DeliveryService;
}

/**
 * Represents the cost details for a delivery
 * @interface DeliveryCost
 */
export interface DeliveryCost {
  /** Three-letter currency code (e.g., 'MYR'), 3 characters */
  currency?: string;
  /** Cost amount in specified currency, decimal(10,2) */
  amount: number;
}

/**
 * Represents the response for a create delivery order request
 * @interface DeliveryOrderResponse
 */
export interface DeliveryOrderResponse {
  /** Order reference number, maximum 64 characters */
  orderNumber: string;
  /** Delivery service response details */
  deliveryService: {
    /** Status of the delivery order creation */
    status: string;
    /** Creation date and time in format YYYY-MM-DD HH:mm:ss */
    createdDateTime?: string;
    /** Tracking number for the delivery, maximum 35 characters */
    trackingNumber: string;
    /** Optional cost information */
    deliveryCost?: DeliveryCost;
  };
}