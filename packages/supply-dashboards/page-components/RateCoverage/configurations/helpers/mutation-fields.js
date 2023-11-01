/* eslint-disable no-param-reassign */
/* eslint-disable custom-eslint/function-name-check */
import {
	asyncFieldsOrganization, asyncFieldsOrganizationUsers,
	useGetAsyncOptions, asyncFieldsLocations,
} from '@cogoport/forms';
import { merge, startCase } from '@cogoport/utils';

import useGetMainPortsOptions from '../../../RfqEnquiries/hooks/useGetMainPortsOptions';

function FieldMutation({ fields, values, filter, chargeCodes, fclCfsChargeCodes }) {
	const organizationUsers = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),
	);
	const mainPortOptions1 = useGetMainPortsOptions({ location_id: values?.origin_location_id });

	const mainPortOptions2 = useGetMainPortsOptions({ location_id: values?.destination_location_id });

	const serviceProviders = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						status       : 'active',
						kyc_status   : 'verified',
						account_type : 'service_provider',
						service      : `${filter?.service}${['haulage',
							'trailer'].includes(filter.service) ? '_freight' : ''}`,
					},
				},
			},
		),
	);

	const origin = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: values?.origin_type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const destination = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: values?.destination_type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const finalFields = (fields || []).map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviders };
		}
		if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsers };
		}

		if (name === 'origin_main_port_id') {
			newControl = { ...newControl, ...mainPortOptions1 };
		}

		if (name === 'destination_main_port_id') {
			newControl = { ...newControl, ...mainPortOptions2 };
		}
		if (name === 'origin_location_id') {
			newControl = { ...newControl, ...origin };
		}
		if (name === 'destination_location_id') {
			newControl = { ...newControl, ...destination };
		}

		if (control?.controls) {
			control.controls.forEach((childCtrl) => {
				if (childCtrl.name === 'unit') {
					const UNIT_OPTIONS = {};
					const chargeValues = values[control.name];
					chargeValues?.forEach((item, i) => {
						UNIT_OPTIONS[i] = (
							chargeCodes?.[item.code]?.units || fclCfsChargeCodes?.[item.cfs_line_items]?.units
							|| ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					childCtrl.customProps = {};
					childCtrl.customProps.options = UNIT_OPTIONS;
				}

				if (childCtrl.name === 'code') {
					const OPTIONS = [];
					Object.keys(chargeCodes || {}).forEach((code) => {
						OPTIONS.push({ label: `${code} ${chargeCodes[code]?.name}`, value: code });
					});
					childCtrl.options =	OPTIONS;
				}
				if (childCtrl.name === 'cfs_line_items') {
					const OPTIONS = [];
					Object.keys(fclCfsChargeCodes || {}).forEach((code) => {
						OPTIONS.push({ label: `${code} ${fclCfsChargeCodes[code]?.name}`, value: code });
					});
					childCtrl.options =	OPTIONS;
				}
			});
		}

		return { ...newControl };
	});

	return {
		finalFields,
	};
}
export default FieldMutation;
