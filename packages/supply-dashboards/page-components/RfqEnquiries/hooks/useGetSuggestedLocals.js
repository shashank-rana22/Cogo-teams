import { useEffect } from 'react';

import useGetRmsRates from './useGetRmsRates';

const useGetSuggestedLocals = ({ section, data, formValues }) => {
	const type = section?.name === 'origin_local' ? 'origin' : 'destination';
	let service;
	if (data.service === 'fcl_freight') {
		service = 'fcl_freight_local';
	}
	if (data.service === 'air_freight') {
		service = 'air_freight_local';
	}
	const { fetchSystemData, systemData, loadingSystemRates } = useGetRmsRates({ service: { service } });
	const body = {
		port_id          : data?.data?.[`${type}_port_id`],
		shipping_line_id : formValues?.shipping_line_id,
		container_size   : data?.data?.container_size,
		container_type   : data?.data?.container_type,
		commodity        : data?.data?.commodity,
		trade_type       : type === 'origin' ? 'export' : 'import',
		main_port_id:
			type === 'origin'
				? formValues?.origin_main_port_id
				: formValues?.destination_main_port_id,
	};

	let canCallLocals = false;
	if (service === 'fcl_freight_local') {
		canCallLocals = !!formValues?.shipping_line_id;
		if (body.trade_type === 'export' && data?.data?.origin_port?.is_icd) {
			canCallLocals = !!formValues?.origin_main_port_id;
		} else if (body.trade_type === 'import' && data?.data?.destination_port?.is_icd) {
			canCallLocals = !!formValues?.destination_main_port_id;
		}
	}
	if (service === 'air_freight_local') {
		canCallLocals = !!formValues?.airline_id;
	}

	useEffect(() => {
		if (service && canCallLocals) {
			fetchSystemData({ filters: body, page_limit: 20 });
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canCallLocals, service]);
	return {
		systemData,
		list: systemData?.list || [],
		loadingSystemRates,
	};
};
export default useGetSuggestedLocals;
