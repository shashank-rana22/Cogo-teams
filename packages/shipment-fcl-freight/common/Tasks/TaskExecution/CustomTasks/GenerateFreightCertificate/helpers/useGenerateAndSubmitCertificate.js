import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const SUCCESS_CODE = 200;

const getFclFreightUpdateData = ({
	values = {},
	commodityValues = {},
	containersData = [],
	id,
}) => {
	const rateData = values?.freight_declaration;
	const HAZARDOUS_CONTAINERS = [];
	const NON_HAZARDOUS_CONTAINERS = [];
	const NON_HAZ_QUOTATIONS = [];
	const HAZ_QUOTATIONS = [];

	containersData?.forEach((item) => {
		const { container_number, container_size, container_type } = item || {};

		const container_data = `${container_number}/${container_size}`;

		if (commodityValues[`is_hazardous-${item?.serial_no}`] === `hazardous-${container_size}-${container_type}`) {
			HAZARDOUS_CONTAINERS.push(container_data);
		} else {
			NON_HAZARDOUS_CONTAINERS.push(container_data);
		}
	});

	rateData?.forEach((data) => {
		const containerDetails = data?.item?.split('-');

		if (Number(data?.freight_price)) {
			const quotation = {
				freight_price  : Number(data?.freight_price),
				origin_price   : Number(data?.origin_price),
				currency       : data?.currency,
				unit           : undefined,
				container_size : containerDetails?.[FIRST_INDEX],
				container_type : containerDetails?.[SECOND_INDEX],
			};

			if (containerDetails?.[GLOBAL_CONSTANTS.zeroth_index] === 'hazardous') {
				HAZ_QUOTATIONS.push(quotation);
			} else {
				NON_HAZ_QUOTATIONS.push(quotation);
			}
		}
	});

	return {
		update_data: {
			haz_container_nos     : HAZARDOUS_CONTAINERS,
			non_haz_container_nos : NON_HAZARDOUS_CONTAINERS,
			haz_quotation         : HAZ_QUOTATIONS,
			non_haz_quotation     : NON_HAZ_QUOTATIONS,
		},
		shipment_id: id,
	};
};

const useGenerateAndSubmitCertificate = ({
	task = {},
	containersData,
	commodityValues = {},
	shipmentData = {},
	refetch = () => {},
	onCancel = () => {},
	setValue = () => {},
	updateTask = () => {},
	generateCertificate = () => {},

}) => {
	const commodityTypes = useMemo(() => [...new Set(Object.values(commodityValues))], [commodityValues]);

	useEffect(() => {
		const FREIGHT_DECLARATION = [];
		commodityTypes?.forEach((type) => {
			const rateObject = {
				item      : type,
				commodity : startCase(type),
			};
			FREIGHT_DECLARATION.push(rateObject);
		});

		setValue('freight_declaration', FREIGHT_DECLARATION);
	}, [setValue, commodityTypes]);

	const onSubmit = async (values) => {
		let data = {};

		data = getFclFreightUpdateData({
			values,
			commodityValues,
			containersData,
			id: shipmentData?.id,
		});

		const res = await generateCertificate(data);

		if (res?.status === SUCCESS_CODE && !isEmpty(task?.id)) {
			const resTask = await updateTask({
				id   : task?.id,
				data : {
					shipment: { id: shipmentData?.id },
				},
			});

			if (resTask?.status === SUCCESS_CODE) {
				onCancel();
				refetch();
			}
		}
	};

	return {
		onSubmit,
	};
};

export default useGenerateAndSubmitCertificate;
