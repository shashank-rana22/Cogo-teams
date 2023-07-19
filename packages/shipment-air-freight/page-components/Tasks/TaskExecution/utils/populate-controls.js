import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import checkAWBValidation from './checkAWBNumberValidation';

const DEFAULT_BL_COUNT_VALUE = 1;
const geo = getGeoConstants();
const populateControls = ({
	controls,
	getApisData,
	task,
	primary_service,
	mainAirFreight,
	tradeType,
}) => {
	const finalControls = controls;

	if (task.task === 'update_airway_bill_number') {
		(finalControls || []).forEach((control, index) => {
			if (control.name === 'booking_reference_number') {
				const awbNumber = mainAirFreight?.service_provider_id === geo.uuid.freight_force_org_id
					? getApisData?.get_awb_inventory_data?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.awb_number
					: '';
				finalControls[index].value = mainAirFreight?.master_airway_bill_number || awbNumber || '';
				if (
					mainAirFreight?.service_provider_id === geo.uuid.freight_force_org_id
				) {
					finalControls[index].disabled =	!getApisData
						?.list_platform_config_constants?.[GLOBAL_CONSTANTS.zeroth_index]
						?.platform_config_constant_mappings[GLOBAL_CONSTANTS.zeroth_index]?.value[
							primary_service?.airline_id
						];
				}
				finalControls[index].rules.validate = (value) => checkAWBValidation(value);
			}
		});
		return finalControls;
	}

	if (
		task.task === 'update_flight_details'
		&& tradeType === 'export'
		&& getApisData?.get_shipment_air_movement_details?.list
	) {
		const values = (
			getApisData.get_shipment_air_movement_details.list || []
		).map((item) => ({
			flight_number      : item.flight_number,
			from_airport_id    : item.origin_id,
			schedule_arrival   : new Date(item.schedule_arrival),
			schedule_departure : new Date(item.schedule_departure),
			service_type       : item.service_type,
			to_airport_id      : item.destination_id,
		}));

		(finalControls || []).forEach((control, index) => {
			if (control.name === 'schedule_departure') {
				finalControls[index].value = new Date(
					getApisData.get_shipment_air_movement_details.final_departure_time,
				);
			}
			if (control.name === 'schedule_arrival') {
				finalControls[index].value = new Date(getApisData.get_shipment_air_movement_details.final_arrival_time);
			}
			if (control.name === 'movement_details') {
				finalControls[index].value = values;
			}
		});
		return finalControls;
	}
	if (
		task.task === 'upload_airway_bill'
	) {
		(finalControls || []).forEach((control, index) => {
			if (
				control.type === 'fieldArray'
				&& control.document_type !== 'manifest_copy'
			) {
				finalControls[index].noDeleteButtonTill = primary_service?.bls_count || DEFAULT_BL_COUNT_VALUE;
				finalControls[index].value = (
					getApisData?.list_shipment_bl_details || []
				)
					?.filter(
						(blDetailObj) => blDetailObj?.bl_document_type === control.document_type,
					)
					?.map((item) => ({
						description      : '',
						url              : '',
						containers_count : '',
						document_number  : item.bl_number,
						bl_detail_id     : item.id,
					}));
			}
		});

		return finalControls;
	}

	return finalControls;
};

export default populateControls;
