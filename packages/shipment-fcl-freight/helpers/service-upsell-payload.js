import React from 'react';

const getServiceMappings = (service) => {
	const trade_type = service.type === 'origin' ? 'export' : 'import';
	const transportServices = ['trailer_freight', 'ftl_freight', 'ltl_freight'];
	if (transportServices.includes(service.service)) {
		return `${trade_type}_transportation`;
	}
	return `${trade_type}_${service.service}`;
};

const formatPayload = ({ formValues = {}, service = {}, services = [], shipmentData = {}, primary_service }) => {
	const serviceToBeAdded = getServiceMappings(service);

	const shipment_type = shipmentData?.shipment_type;

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type.split('_service')[0],
	}));
	const serviceValues = {};
	Object.keys(formValues).forEach((key) => {
		if (
			key === 'cargo_handling_type'
            && serviceToBeAdded === 'import_fcl_customs'
		) {
			serviceValues.import_transportation_cargo_handling_type = formValues[key];
		}
		if (
			key === 'cargo_handling_type'
            && serviceToBeAdded === 'export_fcl_customs'
		) {
			serviceValues.export_transportation_cargo_handling_type = formValues[key];
		} else {
			serviceValues[`${serviceToBeAdded}_${key}`] = formValues[key];
		}
	});

	const otherData = newServices.find(
		(serviceItem) => serviceItem.service_type === shipment_type,
	);

	let trade_type;
	if (service?.type === 'origin') {
		trade_type = 'export';
	}
	if (service.type === 'destination') {
		trade_type = 'destination';
	}

	const rawParams = {
		trade_type,
		...otherData,
		primary_service,
		source    : 'upsell',
		source_id : shipmentData?.id,
	};

	return {
		rawParams,
	};
};

export default formatPayload;
