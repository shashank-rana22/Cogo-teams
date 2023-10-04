import { upperCase } from '@cogoport/utils';

const STAKEHOLDER_MAPPING = {
	supply_agent              : 'Supply Owner',
	booking_agent             : 'KAM',
	service_ops1              : 'Booking Desk',
	service_ops2              : 'Document Desk',
	service_ops3              : 'Service Ops 3',
	sales_agent               : 'Sales Agent',
	costbooking_ops           : 'Cost Booking Ops',
	origin_booking_agent      : 'OKAM',
	destination_booking_agent : 'DKAM',
	credit_controller         : 'Credit Controller',
	ground_ops                : 'Ground Ops',
	service_ops2_docs         : 'Service Ops 2 Docs',
	printing_desk             : 'Printing Desk',
};

const formatStakeholderData = (data = []) => {
	const formatData = { shipment: [] };

	data.forEach((item) => {
		if (item?.service_type) {
			if (!Object.keys(formatData)?.includes(item.service_type)) {
				formatData[item.service_type] = [item];
			} else { formatData[item.service_type].push(item); }
		} else {
			formatData.shipment.push(item);
		}
	});

	return formatData;
};

const getStakeholderData = (data = []) => {
	const formatData = formatStakeholderData(data);

	const STAKEHOLDER_OPTIONS = [];

	(Object.keys(formatData) || []).forEach((key) => {
		(formatData[key] || []).forEach((item) => {
			const {
				stakeholder_type = '',
				user: {
					name = '',
				},
			} = item || {};

			STAKEHOLDER_OPTIONS.push({
				label: `${STAKEHOLDER_MAPPING[stakeholder_type]
                    || upperCase(stakeholder_type)}: ${name} (${upperCase(key)})`,
				value: item?.stakeholder_id,
			});
		});
	});

	return STAKEHOLDER_OPTIONS;
};

export default getStakeholderData;
