/* eslint-disable no-param-reassign */
/* eslint-disable custom-eslint/function-name-check */
import {
	asyncFieldsOrganization, asyncFieldsOrganizationUsers,
	useGetAsyncOptions, asyncFieldsLocations,
} from '@cogoport/forms';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { isEmpty, merge, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetMainPortsOptions from '../../../RfqEnquiries/hooks/useGetMainPortsOptions';
import {
	DANGEROUS_COMMODITY_OPTIONS, OTHER_SPECIAL_INTERNATIONAL_OPTIONS,
	TEMP_CONTROLLED_RANGE_OPTIONS,
} from '../air-subType';

import { cargoHandlingOptions, COMMODITY_TYPE_OPTIONS } from './constants';

function FieldMutation({
	fields, values, filter, chargeCodes, fclCfsChargeCodes, setValue,
}) {
	let finalFilteredOptions = [];
	const dataTradeType = values?.trade_type;
	const detentionSlabs = values?.detention_days;
	const freeDetentionDays = values?.detention_free_days;
	const demurrageSlabs = values?.demurrage_days;
	const freeDemurrageDays = values?.demurrage_free_days;
	const freeDaysSlabs = values?.add_slabs;
	const freeDaysLimit = values?.free_limit_days;

	const organizationUsers = useGetAsyncOptions(
		merge(
			asyncFieldsOrganizationUsers(),
			{ params: { filters: { organization_id: values?.service_provider_id } } },
		),
	);
	const mainPortOptions1 = useGetMainPortsOptions({ location_id: values?.origin_location_id });

	const mainPortOptions2 = useGetMainPortsOptions({ location_id: values?.destination_location_id });

	const filterService = () => {
		if (['haulage', 'trailer']?.includes(filter.service)) {
			return `${filter.service}_freight`;
		}
		if (['fcl_freight_local', 'air_freight_local']?.includes(filter.service)) {
			return filter.service?.replace('_local', '');
		}
		return filter.service;
	};

	const service = filterService();
	const serviceProviders = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{
				params: {
					filters: {
						status       : 'active',
						kyc_status   : 'verified',
						account_type : 'service_provider',
						service,
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

	const CommodityOptions = getCommodityList(filter?.service, values?.container_type);

	const COMMODITY_SUB_TYPE_MAPPING = {
		dangerous       : DANGEROUS_COMMODITY_OPTIONS,
		temp_controlled : TEMP_CONTROLLED_RANGE_OPTIONS,
		other_special   : OTHER_SPECIAL_INTERNATIONAL_OPTIONS,
	};

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
		if (name === 'cargo_handling_type') {
			finalFilteredOptions = cargoHandlingOptions.filter((option) => option.tradeType === dataTradeType);
			newControl = { ...newControl, options: finalFilteredOptions };
		}
		if (name === 'commodity') {
			newControl = { ...newControl, options: CommodityOptions };
		}
		if (name === 'commodity_type') {
			newControl = {
				...newControl,
				options: isEmpty(newControl?.options)
					? COMMODITY_TYPE_OPTIONS[values?.air_commodity] : newControl?.options,
			};
		}
		if (name === 'commodity_sub_type') {
			newControl = {
				...newControl,
				options: values?.air_commodity === 'special_consideration'
					? COMMODITY_SUB_TYPE_MAPPING[values?.commodity_type] : [{ label: 'All', value: 'all' }],
			};
		}

		if (control?.controls) {
			control.controls?.forEach((childCtrl) => {
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
					Object.keys(chargeCodes || {})?.forEach((code) => {
						OPTIONS.push({ label: `${code} ${chargeCodes[code]?.name}`, value: code });
					});
					childCtrl.options =	OPTIONS;
				}
				if (childCtrl.name === 'cfs_line_items') {
					const OPTIONS = [];
					Object.keys(fclCfsChargeCodes || {})?.forEach((code) => {
						OPTIONS.push({ label: `${code} ${fclCfsChargeCodes[code]?.name}`, value: code });
					});
					childCtrl.options =	OPTIONS;
				}
			});
		}

		return { ...newControl };
	});

	useEffect(() => {
		if (freeDetentionDays) {
			detentionSlabs?.forEach((obj, index) => {
				if (!index) {
					setValue(
						'detention_days.0.lower_limit',
						Number(freeDetentionDays) + 1,
					);
				} else {
					setValue(
						`detention_days.${index}.lower_limit`,
						Number(detentionSlabs[index - 1].upper_limit) + 1,
					);
				}
			});
		}
		if (freeDemurrageDays) {
			demurrageSlabs?.forEach((obj, index) => {
				if (!index) {
					setValue(
						'demurrage_days.0.lower_limit',
						Number(freeDemurrageDays) + 1,
					);
				} else {
					setValue(
						`demurrage_days.${index}.lower_limit`,
						Number(demurrageSlabs[index - 1].upper_limit) + 1,
					);
				}
			});
		}
		if (freeDaysSlabs) {
			freeDaysSlabs?.forEach((obj, index) => {
				if (index === 0) {
					setValue('add_slabs.0.lower_limit', Number(freeDaysLimit) + 1 || 0);
				} else {
					setValue(
						`add_slabs.${index}.lower_limit`,
						Number(freeDaysSlabs?.[index - 1].upper_limit) + 1,
					);
				}
			});
		}
	}, [freeDetentionDays, freeDemurrageDays, detentionSlabs, setValue, demurrageSlabs, freeDaysSlabs, freeDaysLimit]);

	return {
		finalFields,
	};
}
export default FieldMutation;
