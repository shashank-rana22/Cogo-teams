/* eslint-disable react-hooks/exhaustive-deps */
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization, asyncFieldsOrganizationUsers } from '@cogoport/forms/utils/getAsyncFields';
import { merge, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getOptions from '../../utilis/get-options';

const INCREMENT_VALUE = 1;

const useFieldMutation = ({
	fields, values, chargeCodesAll, cfsCharges, service_type, mandatoryChargeCnt, setValue,
}) => {
	const serviceProviderOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{ params: { filters: { account_type: 'service_provider', kyc_status: 'verified' } } },
		),
	);

	const organizationUsersOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),

	);

	const detentionSlabs = values?.detention_days;
	const freeDetentionDays = values?.detention_free_days;
	const demurrageSlabs = values?.demurrage_days;
	const freeDemurrageDays = values?.demurrage_free_days;

	const newfields = fields.map((control) => {
		const { name, type, optionsListKey } = control;
		let newControl = { ...control };

		if (optionsListKey) {
			newControl.options = getOptions(optionsListKey, control, values);
		}

		if (type === 'fieldArray') {
			newControl.controls = newControl.controls.map((ctrl) => {
				const newCtrl = { ...ctrl };
				if (ctrl.optionsListKey) {
					newCtrl.options = getOptions(ctrl.optionsListKey, ctrl, values);
				}
				return newCtrl;
			});
		}

		if (type === 'fieldArray' && name.includes('line_items')) {
			const codeMapping = name === 'fcl_customs_cfs_line_items' ? cfsCharges : chargeCodesAll || {};

			newControl.controls = newControl.controls.map((childCtrl) => {
				const newChildCtrl = { ...childCtrl };
				if (childCtrl.name === 'unit') {
					const UNIT_OPTIONS = {};
					const chargeValues = values[control.name];

					chargeValues?.forEach((item, i) => {
						UNIT_OPTIONS[i] = (codeMapping.find((x) => x.code === (item.code
								|| item?.fcl_customs_cfs_line_items))?.units || ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					newChildCtrl.customProps = { options: UNIT_OPTIONS };
				}
				if (childCtrl.name === 'code') {
					newChildCtrl.options =	(name === 'fcl_customs_cfs_line_items'
						? cfsCharges
						: chargeCodesAll).map((code) => ({ ...code, value: code.code }));
				}

				if (service_type === 'fcl_cfs' && childCtrl.name === 'code') {
					newChildCtrl.options = cfsCharges.map((code) => ({ ...code, value: code.code }));
				}
				newControl.noDeleteButtonTill = mandatoryChargeCnt;
				return newChildCtrl;
			});
		}

		switch (name) {
			case 'service_provider_id':
				newControl = { ...newControl, ...serviceProviderOptions };
				break;
			case 'sourced_by_id':
				newControl = { ...newControl, ...organizationUsersOptions };
				break;
			default:
				break;
		}

		return { ...newControl };
	});

	useEffect(() => {
		if (freeDetentionDays) {
			detentionSlabs.forEach((obj, index) => {
				if (!index) {
					setValue(
						'detention_days.0.lower_limit',
						Number(freeDetentionDays) + INCREMENT_VALUE,
					);
				} else {
					setValue(
						`detention_days.${index}.lower_limit`,
						Number(detentionSlabs[index - INCREMENT_VALUE].upper_limit) + INCREMENT_VALUE,
					);
				}
			});
		}
		if (freeDemurrageDays) {
			demurrageSlabs.forEach((obj, index) => {
				if (!index) {
					setValue(
						'demurrage_days.0.lower_limit',
						Number(freeDemurrageDays) + INCREMENT_VALUE,
					);
				} else {
					setValue(
						`demurrage_days.${index}.lower_limit`,
						Number(demurrageSlabs[index - INCREMENT_VALUE].upper_limit) + INCREMENT_VALUE,
					);
				}
			});
		}
	}, [
		freeDetentionDays,
		JSON.stringify(detentionSlabs),
		freeDemurrageDays,
		JSON.stringify(demurrageSlabs),
	]);

	return { newfields };
};

export default useFieldMutation;
