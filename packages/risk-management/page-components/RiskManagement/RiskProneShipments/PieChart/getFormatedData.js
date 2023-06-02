const getFormatedData = (stats) => {
	const { container_stats, late_collection_stats, late_release_stats } = stats || {};
	const {
		draft_bl_approval_pending = '', invoice_not_uploaded = '', late_collection = '',
		late_collection_total = '', payment_not_done = '',
	} = late_collection_stats || {};

	const { late_release_total = '' } = late_release_stats || {};
	const {
		gated_in_at_vessel_departure = '', pick_up_and_not_gated_in = '',
		vessel_arrived_but_not_gated_out = '', container_not_picked_up = '', gated_out_but_not_returned = '',
	} = container_stats || {};
	const colors = ['#EE3425', '#F8AEA8', '#F37166', '#BF291E', '#FFD1CC'];
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
			value : pick_up_and_not_gated_in,
			color : ' #F37166',
		},
		{
			id    : 'Gated In At Vessel Dep',
			label : 'Gated In At Vessel Dep. :',
			value : gated_in_at_vessel_departure,
			color : '#F8AEA8',
		},
		{
			id    : 'Vessel Arrived but not gated out',
			label : 'Vessel Arrived but not gated out :',
			value : vessel_arrived_but_not_gated_out,
			color : '#BF291E',
		},
		{
			id    : 'Gated out + not returned',
			label : 'Gated out + not returned :',
			value : gated_out_but_not_returned,
			color : ' #FFD1CC',
		},
	];
	const LATE_COLLECTION_MAPPING = [
		{
			label : 'Payment Not Done :',
			value : payment_not_done,
		},
		{
			label : 'Draft Bl Approval Pending : ',
			value : draft_bl_approval_pending,
		},
		{
			label : 'Invoice Not Uploaded : ',
			value : invoice_not_uploaded,
		},
		{
			label : 'Late Collection :  ',
			value : late_collection,
		},
	];
	const CHARGE_RANGE_MAPPING = [
		{
			label : 'INR 10,000 - INR 1,00,000 :',
			value : 4,
			color : '#EE3425',
		},
		{
			label : 'INR 100,001 - INR 5,00,000 :',
			value : 68,
			color : '#F37166',
		},
		{
			label : 'INR 500,001 - INR 10,00,000',
			value : 50,
			color : '#F8AEA8',
		},
		{
			label : 'INR 10,00,001 - INR 50,00,000 :',
			value : 23,
			color : '#BF291E',
		},
		{
			label : '> INR 50,00,000 :',
			value : 25,
			color : '#FFD1CC',
		},
	];
	const bl_do_data = [
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
	const tabData = {
		container_movement : CONTAINER_MOVEMENT_MAPPING,
		bl_do_release      : bl_do_data,
		both               : CONTAINER_MOVEMENT_MAPPING,
	};

	return {
		colors,
		CONTAINER_MOVEMENT_MAPPING,
		LATE_COLLECTION_MAPPING,
		CHARGE_RANGE_MAPPING,
		tabData,
	};
};

export default getFormatedData;
