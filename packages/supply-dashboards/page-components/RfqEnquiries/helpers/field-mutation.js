import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOrganization, asyncFieldsOrganizationUsers, asyncFieldsOperators,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { merge, startCase } from '@cogoport/utils';

const QUERY_MAPPING = {
	fcl_freight       : 'fcl_freight',
	lcl_freight       : 'lcl_freight',
	air_freight       : 'air_freight',
	fcl_freight_local : 'fcl_freight',
	lcl_freight_local : 'lcl_freight',
};

const useFieldMutation = ({
	fields, values, data, service = {},
}) => {
	const serviceProviderOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						account_type : 'service_provider',
						kyc_status   : 'verified',
						service      : QUERY_MAPPING[service?.service],
					},
				},
			},
		),
	);
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));

	const airLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'airline' } } },
	));
	const organizationUsersOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),

	);

	const newField = fields.map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviderOptions };
		} else if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsersOptions };
		} else if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		} else if (name === 'airline_id') {
			newControl = { ...newControl, ...airLineOptions };
		} else if (name === 'validity_start' || name === 'validity_end') {
			newControl = {
				...newControl,
				minDate : new Date(data?.spot_negotiation?.data?.validity_start),
				maxDate : new Date(data?.spot_negotiation?.data?.validity_end),
			};
		} else if (name === 'departure_dates') {
			newControl = {
				...newControl,
				disabled : !(values?.validity_start && values?.validity_end),
				datePair : {
					startDate : values?.validity_start,
					endDate   : values?.validity_end,
				},
			};
		}
		if (newControl.controls) {
			let chargeCodes = {};
			if (newControl.charge_code_name && data?.[newControl.charge_code_name]) {
				chargeCodes = data[newControl.charge_code_name];
			}
			newControl.controls.forEach((childcontrol) => {
				if (childcontrol.name === 'unit') {
					const UNIT_OPTIONS = {};
					const chargeValues = values[control.name];
					chargeValues?.forEach((item, i) => {
						UNIT_OPTIONS[i] = (
							chargeCodes[item.code]?.units || ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					// eslint-disable-next-line no-param-reassign
					childcontrol.customProps = {};
					// eslint-disable-next-line no-param-reassign
					childcontrol.customProps.options = UNIT_OPTIONS;
				}
				if (childcontrol.name === 'code') {
					const newOptions = Object.keys(chargeCodes).map((code) => ({
						label : `${code} ${chargeCodes[code]?.name}`,
						value : code,
						code,
						...(chargeCodes[code] || {}),
					}));
					// eslint-disable-next-line no-param-reassign
					childcontrol.options = newOptions;
				}
			});
		}
		return { ...newControl };
	});

	return { newField };
};

export default useFieldMutation;
