import {
	asyncFieldsListOperators,
	asyncFieldsLocations,
	asyncFieldsPartnerUsersIds,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';

import { filterOption } from '../../../../../configurations/helpers/constants';

import airControls from './air-controls';
import fclControls from './fcl-controls';
import fclCustomsControls from './fcl-customs';
import ftlControls from './ftl-controls';
import haulageControls from './haulage-controls';
import lclControls from './lcl-controls';
import lclCustomsControls from './lcl-customs-controls';
import trailerControls from './trailer_control';

const serviceControlsMap = {
	fcl_freight     : fclControls,
	air_freight     : airControls,
	haulage_freight : haulageControls,
	fcl_customs     : fclCustomsControls,
	lcl_freight     : lclControls,
	lcl_customs     : lclCustomsControls,
	trailer_freight : trailerControls,
	ftl_controls    : ftlControls,
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
	const selectedService = filter?.service;
	if (selectedService && serviceControlsMap[selectedService]) {
		CONTROL = serviceControlsMap[selectedService]({
			data,
			listShippingLineOptions,
			user_id,
			listPartnerUserOptions,
			listAirLineOptions,
			fclCommodityOptions,
			originLocationOptions,
			destinationLocationOptions,
		});
	}

	const { DEFAULT_VALUES, fields } = getDefaultValues(CONTROL);

	return { DEFAULT_VALUES, fields, CONTROL };
}

export default useControls;
