import {
	asyncFieldsListOperators,
	asyncFieldsLocations,
	asyncFieldsPartnerUsersIds,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';

import airControls from './air-controls';
import fclControls from './fcl-controls';
import fclCustomsControls from './fcl-customs';
import ftlControls from './ftl-controls';
import haulageControls from './haulage-controls';
import lclControls from './lcl-controls';
import lclCustomsControls from './lcl-customs-controls';
import trailerControls from './trailer_control';

const filterOption = {
	fcl_freight     : ['seaport'],
	lcl_freight     : ['seaport'],
	air_freight     : ['airport'],
	fcl_customs     : ['seaport'],
	lcl_customs     : ['seaport'],
	air_customs     : ['airport'],
	haulage_freight : ['pincode', 'seaport'],
	trailer_freight : ['pincode', 'seaport'],
	ftl_freight     : ['pincode', 'seaport'],
};

const getDefaultValues = (oldfields) => {
	const DEFAULT_VALUES = {};
	const newfields = oldfields?.map((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			DEFAULT_VALUES[field.name] = value || [];
		} else {
			DEFAULT_VALUES[field.name] = value || '';
		}
		return rest;
	});
	return { DEFAULT_VALUES, fields: newfields };
};

function useControls({
	data, user_id, filter,
}) {
	const getCommodityOptions = (container_type = 'standard') => {
		const commodities = FREIGHT_CONTAINER_COMMODITY_MAPPINGS[container_type];
		return (commodities || []).map((commodity) => ({
			label : (commodity.split('-') || []).map((item) => parseFloat(item) || startCase(item)).join(' '),
			value : commodity,
		}));
	};

	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: filterOption?.[filter?.service] } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: filterOption?.[filter?.service] } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const listShippingLineOptions = useGetAsyncOptions(
		merge(
			asyncFieldsListOperators(),
			{
				params: {
					filters: {
						operator_type : 'shipping_line',
						status        : 'active',
					},
				},
			},
		),
	);

	const listAirLineOptions = useGetAsyncOptions(
		merge(
			asyncFieldsListOperators(),
			{
				params: {
					filters: {
						operator_type : 'airline',
						status        : 'active',
					},
				},
			},
		),
	);

	const listPartnerUserOptions = useGetAsyncOptions(
		merge(
			asyncFieldsPartnerUsersIds(),
			{
				params: {
					filters: {
						status: 'active',
					},
				},
			},
		),
	);

	const fclCommodityOptions = getCommodityOptions(data?.container_type);

	let CONTROL = [];
	if (filter?.service === 'fcl_freight') {
		CONTROL = fclControls({
			data,
			listShippingLineOptions,
			originLocationOptions,
			destinationLocationOptions,
			fclCommodityOptions,
		});
	}
	if (filter?.service === 'air_freight') {
		CONTROL = airControls({
			data,
			listPartnerUserOptions,
			user_id,
			originLocationOptions,
			destinationLocationOptions,
			listAirLineOptions,
		});
	}
	if (filter?.service === 'haulage_freight') {
		CONTROL = haulageControls({
			data,
			listPartnerUserOptions,
			user_id,
			originLocationOptions,
			destinationLocationOptions,
			listAirLineOptions,
		});
	}
	if (filter?.service === 'fcl_customs') {
		CONTROL = fclCustomsControls({
			data,
			listShippingLineOptions,
			fclCommodityOptions,
			originLocationOptions,
			destinationLocationOptions,
		});
	}
	if (filter?.service === 'lcl_freight') {
		CONTROL = lclControls({
			data,
			fclCommodityOptions,
			originLocationOptions,
			destinationLocationOptions,
		});
	}
	if (filter?.service === 'fcl_customs') {
		CONTROL = fclCustomsControls({
			data,
			fclCommodityOptions,
			originLocationOptions,
		});
	}
	if (filter?.service === 'lcl_customs') {
		CONTROL = lclCustomsControls({
			data,
			fclCommodityOptions,
			originLocationOptions,
		});
	}
	if (filter?.service === 'trailer_freight') {
		CONTROL = trailerControls({
			data,
			fclCommodityOptions,
			originLocationOptions,
			destinationLocationOptions,
		});
	}
	if (filter?.service === 'ftlControls') {
		CONTROL = ftlControls({
			data,
			fclCommodityOptions,
			originLocationOptions,
			destinationLocationOptions,
		});
	}

	const { DEFAULT_VALUES, fields } = getDefaultValues(CONTROL);

	return { DEFAULT_VALUES, fields, CONTROL };
}

export default useControls;
