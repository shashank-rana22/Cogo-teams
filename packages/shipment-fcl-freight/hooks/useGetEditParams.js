import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

const getCondition = (shipment_data, conditions) => {
	let show = true;
	Object.keys(conditions).forEach((condition) => {
		if (!conditions[condition].includes(shipment_data[condition])) {
			show = false;
		}
	});
	return show;
};
const getShowElement = (shipment_data, control) => {
	const { conditions } = control;
	let show = false;
	conditions.forEach((condition) => {
		show = show || getCondition(shipment_data, condition);
	});
	return show;
};

function useGetEditParams({ services, controls, serviceData = [] }) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	console.log('shipment_data', shipment_data);

	const newFilteredControls = {};
	const boxesToShow = (services || [])?.filter(
		(serviceItem) => serviceItem.service_type === `${shipment_data?.shipment_type}_service`,
	);

	let isControlEditable = false;
	boxesToShow.forEach((serviceItem) => {
		const newData = {
			...shipment_data,
			main_service_state      : serviceItem?.state,
			main_service_bl_type    : serviceItem?.bl_type,
			main_service_trade_type : primary_service?.inco_term,
		};
		const filteredServiceControls = controls.filter((control) => getShowElement(newData, control));
		if (filteredServiceControls.length) {
			isControlEditable = true;
		}
		newFilteredControls[serviceItem?.id] = filteredServiceControls;
	});

	const showEditButton = isControlEditable && serviceData?.[0]?.show_edit_params;

	return {
		showEditButton,
		boxesToShow,
		newFilteredControls,
	};
}
export default useGetEditParams;
