/**
 * Information about the current location of a parcel
 * Based on MS 2781:2023 Section 6.2.2
 * @interface ParcelLocation
 */
export interface ParcelLocation {
  /** 
   * Current hub location of the parcel
   * Maximum 128 characters
   */
  hubLocation: string;

  /** 
   * Date and time when parcel arrived at the hub
   * Format: YYYY-MM-DD HH:mm:ss
   */
  dateTime: string;
}

/**
 * Information about the recipient receiving the parcel
 * Based on MS 2781:2023 Section 6.2.2
 * @interface RecipientInfo
 */
export interface RecipientInfo {
  /** 
   * Identity of receiver (NRIC last 4 digits, name, or photo URL)
   * Maximum 255 characters
   * Can include:
   * - National Registration Identity Card (NRIC) or last four digits
   * - Photo of delivered order (image URL)
   * - Receiver's name
   */
  receivedBy: string;

  /** 
   * Date and time when parcel was received
   * Format: YYYY-MM-DD HH:mm:ss
   */
  receivedDateTime: string;
}

/**
 * Request to get delivery status update
 * Based on MS 2781:2023 Section 6.2.1
 * @interface UpdateDeliveryStatusRequest
 */
export interface UpdateDeliveryStatusRequest {
  /** Optional delivery service information */
  deliveryService?: {
    /** 
     * Tracking number from create delivery response
     * Maximum 35 characters 
     */
    trackingNumber: string;
  };
}

/**
 * Response containing delivery status information
 * Based on MS 2781:2023 Section 6.2.2
 * @interface UpdateDeliveryStatusResponse
 */
export interface UpdateDeliveryStatusResponse {
  /** 
   * Tracking number from create delivery response
   * Maximum 35 characters
   */
  trackingNumber: string;

  /** Delivery status information */
  deliveryStatus: {
    /** Current status of the delivery */
    status: string;

    /** 
     * Date and time when parcel was picked up
     * Format: YYYY-MM-DD HH:mm:ss
     */
    pickupDateTime: string;

    /** Optional recipient information when delivered */
    recipientInfo?: RecipientInfo;

    /** Optional current location information */
    parcelLocation?: ParcelLocation;
  };
}