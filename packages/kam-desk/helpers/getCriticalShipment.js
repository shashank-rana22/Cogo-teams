import { addDays, subtractDays } from '@cogoport/utils';

const getCriticalShipment = ({ activeTab, stepperTab, shipmentType, shipment }) => {
	const {
		schedule_departure, schedule_arrival,
		free_days_detention_destination, free_days_destination_storage,
	} = shipment;

	let freeDays = free_days_detention_destination || free_days_destination_storage || 0;
	freeDays = freeDays > 2 ? freeDays - 2 : freeDays;

	const TODAY = new Date(new Date().setHours(23, 59, 59, 999));

	const timezoneOffset = TODAY.getTimezoneOffset();

	const sch_dep = new Date(new Date(schedule_departure).getTime() + timezoneOffset);

	const sch_arr = new Date(new Date(schedule_arrival).getTime() + timezoneOffset);

	const sch_dep_in_three_days = schedule_departure && addDays(TODAY, 3) >= sch_dep;

	const sch_dep_yesterday = schedule_departure && subtractDays(TODAY, 1) >= sch_dep;

	const sch_dep_tomorrow = schedule_departure && addDays(TODAY, 1) >= sch_dep;

	const sch_arr_today = schedule_arrival && TODAY >= sch_arr;

	const sch_arr_free_days = schedule_arrival && subtractDays(TODAY, freeDays) >= sch_arr;

	const mapping = {
		fcl_freight: {
			export: {
				mark_confirmed           : sch_dep_in_three_days,
				upload_booking_note      : sch_dep_in_three_days,
				update_container_details : sch_dep_in_three_days,
				list_task_pending        : sch_dep_yesterday,
				document_approval        : sch_dep_tomorrow,
				vessel_departed          : sch_arr_today,
				vessel_arrived           : sch_arr_free_days,
			},
			import: {
				mark_confirmed        : sch_dep_in_three_days,
				upload_shipping_order : sch_dep_in_three_days,
				list_task_pending     : sch_dep_yesterday,
				document_approval     : sch_dep_tomorrow,
				vessel_departed       : sch_arr_today,
				vessel_arrived        : sch_arr_free_days,
			},
		},
		lcl_freight: {
			export: {
				confirm_booking      : sch_dep_in_three_days,
				list_task_pending    : sch_dep_yesterday,
				upload_carting_order : sch_dep_in_three_days,
				document_approval    : sch_dep_tomorrow,
				vessel_departed      : sch_arr_today,
				vessel_arrived       : sch_arr_free_days,
			},
			import: {
				confirm_booking      : sch_dep_in_three_days,
				list_task_pending    : sch_dep_yesterday,
				upload_carting_order : sch_dep_in_three_days,
				document_approval    : sch_dep_tomorrow,
				vessel_departed      : sch_arr_today,
				vessel_arrived       : sch_arr_free_days,
			},
		},
	};

	return mapping?.[shipmentType]?.[stepperTab]?.[activeTab];
};

export default getCriticalShipment;
