/* eslint-disable custom-eslint/function-name-check */
import { asyncFieldsOrganization, asyncFieldsOrganizationUsers, useGetAsyncOptions } from '@cogoport/forms';
import { merge, startCase } from '@cogoport/utils';

function FieldMutation({ fields, values, filter, chargeCodes }) {
	const organizationUsers = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),
	);

	const serviceProviders = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						status       : 'active',
						service      : filter?.service,
						kyc_status   : 'verified',
						account_type : 'service_provider',
					},
				},
			},
		),
	);

	const finalFields = (fields || []).map((control) => {
		const { name } = control;
		let newControl = { ...control };
		if (name === 'service_provider_id') {
			newControl = { ...newControl, ...serviceProviders };
		}
		if (name === 'sourced_by_id') {
			newControl = { ...newControl, ...organizationUsers };
		}
		if (control?.controls) {
			control.controls.forEach((childCtrl) => {
				if (childCtrl.name === 'unit') {
					const UNIT_OPTIONS = {};
					const chargeValues = values[control.name];
					chargeValues?.forEach((item, i) => {
						UNIT_OPTIONS[i] = (
							chargeCodes?.[item.code]?.units || ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					// eslint-disable-next-line no-param-reassign
					// eslint-disable-next-line no-param-reassign
					childCtrl.customProps = {};
					// eslint-disable-next-line no-param-reassign
					childCtrl.customProps.options = UNIT_OPTIONS;
				}

				if (childCtrl.name === 'code') {
					const OPTIONS = [];
					Object.keys(chargeCodes || {}).forEach((code) => {
						OPTIONS.push({ label: `${code} ${chargeCodes[code]?.name}`, value: code });
					});
					// eslint-disable-next-line no-param-reassign
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
