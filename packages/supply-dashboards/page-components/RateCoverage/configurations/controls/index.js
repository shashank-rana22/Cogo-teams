import {
	asyncFieldsListOperators,
	asyncFieldsLocations,
	asyncFieldsPartnerUsersIds,
	useGetAsyncOptions,
} from '@cogoport/forms';
import { merge } from '@cogoport/utils';

import { filterOption } from '../helpers/constants';

import airControls from './air-controls';
import airCustomsControls from './air-customs-controls';
import airLocalControls from './air-local-controls';
import cfsControls from './fcl-cfs-controls';
import fclControls from './fcl-controls';
import fclCustomsControls from './fcl-customs';
import fclLocalControls from './fcl-local-controls';
import ftlControls from './ftl-controls';
import haulageControls from './haulage-controls';
import lclControls from './lcl-controls';
import lclCustomsControls from './lcl-customs-controls';
import ltlControls from './ltl-controls';
import trailerControls from './trailer-control';

const serviceControlsMap = {
	fcl_freight       : fclControls,
	air_freight       : airControls,
	air_customs       : airCustomsControls,
	haulage           : haulageControls,
	fcl_customs       : fclCustomsControls,
	lcl_freight       : lclControls,
	lcl_customs       : lclCustomsControls,
	trailer           : trailerControls,
	ftl_freight       : ftlControls,
	ltl_freight       : ltlControls,
	fcl_cfs           : cfsControls,
	fcl_freight_local : fclLocalControls,
	air_freight_local : airLocalControls,
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

function useControls({ data = {}, user_id = {}, filter = {}, source = {}, serviceIdPresent = {} }) {
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

	let CONTROL = [];
	const selectedService = filter?.service;
	if (selectedService && serviceControlsMap[selectedService]) {
		CONTROL = serviceControlsMap[selectedService]({
			data,
			listShippingLineOptions,
			user_id,
			listPartnerUserOptions,
			listAirLineOptions,
			originLocationOptions,
			destinationLocationOptions,
			source,
			serviceIdPresent,
		});
	}

	const { DEFAULT_VALUES, fields } = getDefaultValues(CONTROL);

	return { DEFAULT_VALUES, fields, CONTROL };
}

export default useControls;
