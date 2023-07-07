const COLORS = ['#EE3425', '#F8AEA8', '#F37166', '#BF291E', '#FFD1CC', '#FBD1A6'];

const getFormatedData = (stats) => {
	const { container_stats, late_collection_stats, late_release_stats } = stats || {};
	const {
		pending_for_draft_bl_approval = '', pending_for_invoice_upload = '', pending_for_collection = '',
		late_collection_total = '', pending_for_payment = '',
	} = late_collection_stats || {};

	const { late_release_total = '' } = late_release_stats || {};
	const {
		container_gated_in_at_vessel_departure = '', container_picked_up_but_not_gated_in = '', cargo_value_fraud = '',
		container_vessel_arrived_but_not_gated_out = '',
		container_not_picked_up = '', container_gated_out_but_not_returned = '',
	} = container_stats || {};
	const CONTAINER_MOVEMENT_MAPPING = [
		{
			id    : 'Container Not Picked Up',
			label : 'Container Not Picked Up :',
			value : container_not_picked_up,
			color : '#EE3425',
		},
		{
			id    : 'Pick Up And Not Gated In',
			label : 'Pick Up And Not Gated In :',
			value : container_picked_up_but_not_gated_in,
			color : ' #F37166',
		},
		{
			id    : 'Gated In At Vessel Dep',
			label : 'Gated In At Vessel Dep. :',
			value : container_gated_in_at_vessel_departure,
			color : '#F8AEA8',
		},
		{
			id    : 'Vessel Arrived but not gated out',
			label : 'Vessel Arrived but not gated out :',
			value : container_vessel_arrived_but_not_gated_out,
			color : '#BF291E',
		},
		{
			id    : 'Gated out + not returned',
			label : 'Gated out + not returned :',
			value : container_gated_out_but_not_returned,
			color : ' #FFD1CC',
		},
		{
			id    : 'Cargo Value Fraud',
			label : 'Cargo Value Fraud : ',
			value : cargo_value_fraud,
			color : '#FBD1A6',
		},
	];
	const LATE_COLLECTION_MAPPING = [
		{
			label : 'Payment Not Done :',
			value : pending_for_payment,
		},
		{
			label : 'Draft Bl Approval Pending : ',
			value : pending_for_draft_bl_approval,
		},
		{
			label : 'Invoice Not Uploaded : ',
			value : pending_for_invoice_upload,
		},
		{
			label : 'Late Collection :  ',
			value : pending_for_collection,
		},
	];

	const BL_DO_DATA = [
		{
			id    : 'Late Collection',
			label : 'Late Collection',
			value : late_collection_total,

		},
		{
			id    : 'Late Release',
			label : 'Late Release',
			value : late_release_total,

		},
	];
	const TAB_DATA = {
		container_movement : CONTAINER_MOVEMENT_MAPPING,
		bl_do              : BL_DO_DATA,
		both               : CONTAINER_MOVEMENT_MAPPING,
	};

	return {
		COLORS,
		CONTAINER_MOVEMENT_MAPPING,
		LATE_COLLECTION_MAPPING,
		TAB_DATA,
	};
};

export default getFormatedData;
