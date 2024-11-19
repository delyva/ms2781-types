/**
 * Request to cancel a delivery order
 * Based on MS 2781:2023 Section 6.3.1
 * @interface CancelDeliveryOrderRequest
 */
export interface CancelDeliveryOrderRequest {
  /** 
   * Tracking number from original delivery order
   * Maximum 35 characters
   * Used to identify the order to be cancelled
   */
  trackingNumber: string;

  /**
   * Reason for cancellation request
   * Maximum 512 characters
   * Required field to explain cancellation
   */
  reason: string;
}

/**
 * Response from attempting to cancel a delivery order
 * Based on MS 2781:2023 Section 6.3.2
 * @interface CancelDeliveryOrderResponse
 */
export interface CancelDeliveryOrderResponse {
  /** 
   * Tracking number of the order being cancelled
   * Maximum 35 characters
   */
  trackingNumber: string;

  /** 
   * Status of the cancellation request
   * Maximum 35 characters
   * Indicates whether the cancellation was approved or rejected
   */
  status: string;

  /**
   * Optional reason for rejection
   * Maximum 512 characters
   * Required only when status is REJECT
   */
  reason?: string;
}