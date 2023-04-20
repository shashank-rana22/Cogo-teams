import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

const getFclFreightUpdateData = ({
	values,
	commodityValues,
	containersData,
	id,
}) => {
	const rateData = values?.freight_declaration;
	const hazardousContainers = [];
	const nonHazardousContainers = [];
	const nonHazQuotations = [];
	const hazQuotations = [];

	containersData.forEach((item) => {
		const { container_number, container_size, container_type } = item || {};

		const container_data = `${container_number}/${container_size}`;
		if (
			commodityValues[`is_hazardous-${item?.serial_no}`]
			=== `hazardous-${container_size}-${container_type}`
		) {
			hazardousContainers.push(container_data);
		} else {
			nonHazardousContainers.push(container_data);
		}
	});

	rateData?.forEach((data) => {
		const containerDetails = data?.item.split('-');

		if (Number(data?.freight_price)) {
			const quotation = {
				freight_price  : Number(data?.freight_price),
				origin_price   : Number(data?.origin_price),
				currency       : data?.currency,
				unit           : undefined,
				container_size : containerDetails?.[1],
				container_type : containerDetails?.[2],
			};
			if (containerDetails?.[0] === 'hazardous') {
				hazQuotations.push(quotation);
			} else {
				nonHazQuotations.push(quotation);
			}
		}
	});

	return {
		update_data: {
			haz_container_nos     : hazardousContainers,
			non_haz_container_nos : nonHazardousContainers,
			haz_quotation         : hazQuotations,
			non_haz_quotation     : nonHazQuotations,
		},
		shipment_id: id,
	};
};

const useGenerateAndSubmitCertificate = ({
	task,
	containersData,
	commodityValues,
	shipmentData,
	refetch,
	onCancel,
	setValue,
	updateTask,
	generateCertificate,

}) => {
	const commodityTypes = [...new Set(Object.values(commodityValues))];

	useEffect(() => {
		const freightDeclaration = [];
		commodityTypes.forEach((type) => {
			const rateObject = {
				item      : type,
				commodity : startCase(type),
			};
			freightDeclaration.push(rateObject);
		});

		setValue('freight_declaration', freightDeclaration);
	}, [JSON.stringify(commodityTypes)]);

	const onSubmit = async (values) => {
		let data = {};

		data = getFclFreightUpdateData({
			values,
			commodityValues,
			containersData,
			id: shipmentData?.id,
		});

		await generateCertificate(data);
		await updateTask({
			id   : task?.id,
			data : {
				shipment: {
					id: shipmentData.id,
				},
			},
		});
		onCancel();
		refetch();
	};

	return {
		onSubmit,
	};
};

export default useGenerateAndSubmitCertificate;
