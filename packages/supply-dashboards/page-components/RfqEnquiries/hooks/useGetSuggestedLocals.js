import { useEffect } from 'react';

import useGetRmsRates from './useGetRmsRates';

const HAZ_CLASSES = [
	'gases-2.1',
	'gases-2.2',
	'gases-2.3',
	'flammable_liquids-3',
	'flammable_solids-4.1',
	'flammable_solids_self_heat-4.2',
	'emit_flammable_gases_with_water-4.3',
	'imo_classes-5.1',
	'toxic_substances-6.1',
	'infectious_substances-6.2',
	'radioactive_material-7',
	'corrosives-8',
	'miscellaneous_dangerous_goods-9',
];

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
		port_id          : data?.data?.[`${type}_port_id`] || undefined,
		airport_id       : data?.data?.[`${type}_airport_id`] || undefined,
		shipping_line_id : formValues?.shipping_line_id || undefined,
		airline_id       : formValues?.airline_id || undefined,
		container_size   : data?.data?.container_size || undefined,
		container_type   : data?.data?.container_type || undefined,
		commodity        : HAZ_CLASSES.includes(data?.data?.commodity) ? data?.data?.commodity : undefined,
		trade_type       : type === 'origin' ? 'export' : 'import',
		main_port_id:
			type === 'origin'
				? formValues?.origin_main_port_id || undefined
				: formValues?.destination_main_port_id || undefined,
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
