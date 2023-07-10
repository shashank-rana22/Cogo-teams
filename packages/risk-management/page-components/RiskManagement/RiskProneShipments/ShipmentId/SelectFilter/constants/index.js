export const CONTAINER_REASON_OPTIONS = [
	{
		label : 'Container Not Picked Up',
		value : 'container_not_picked_up',
	},
	{
		label : 'Container Picked Up But Not Gated In',
		value : 'container_picked_up_but_not_gated_in',
	},
	{
		label : 'Container Gated In At Vessel Departure',
		value : 'container_gated_in_at_vessel_departure',
	},
	{
		label : 'Container Vessel Arrived But Not Gated Out',
		value : 'container_vessel_arrived_but_not_gated_out',
	},
	{
		label : 'Container Gated Out But Not Returned',
		value : 'container_gated_out_but_not_returned',
	},
	{
		label : 'Cargo Value Fraud',
		value : 'cargo_value_fraud',
	},
];
export const BL_DO_REASON_OPTIONS = [
	{
		label : 'Pending For Invoice Upload',
		value : 'pending_for_invoice_upload',
	},
	{
		label : 'Pending For Payment',
		value : 'pending_for_payment',
	},
	{
		label : 'Pending For Draft BL Approval',
		value : 'pending_for_draft_bl_approval',
	},
	{
		label : 'Pending For Collection',
		value : 'pending_for_collection',
	},
	{
		label : 'Payment Not Received',
		value : 'payment_not_received',
	},
	{
		label : 'Payment Done But BL Not Released',
		value : 'payment_done_but_bl_not_released',
	},
];
export const BOTH_REASON_OPTIONS = CONTAINER_REASON_OPTIONS.concat(BL_DO_REASON_OPTIONS);

export const OPTIONS_MAP = {
	container_movement : CONTAINER_REASON_OPTIONS,
	bl_do              : BL_DO_REASON_OPTIONS,
	both               : BOTH_REASON_OPTIONS,
};
