import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import getAddressMappingControls from '../configurations/address-controls';
import configInvoiceTradePartyControls from '../configurations/invoice-trade-party-controls.json';
import getAddressRegisteredUnderGst from '../configurations/is-registered-under-gst-controls';
import configPocControls from '../configurations/poc-controls.json';

import getValue from './getValue';

const getAddressNewControls = ({ organizationCountryId }) => {
	const configAddressControls = getAddressMappingControls({
		organizationCountryId,
	});

	return configAddressControls.map((control) => {
		let newControl = { ...control };

		const { name, type } = newControl;

		if (type === 'file-uploader') {
			newControl = {
				...newControl,
				uploadIcon: () => <IcMDocument size={2} />,
			};
		}

		if (name === 'tax_number') {
			newControl = {
				...newControl,
				rules: {
					...getValue(newControl, 'rules', {}),
					// pattern: {
					// 	value: GLOBAL_CONSTANTS.regex_patterns.gst_number,
					// 	message: 'GST is invalid',
					// },
				},
			};
		}

		return newControl;
	});
};

const pocControls = configPocControls.map((control) => {
	let newControl = { ...control };

	const { name } = newControl;

	if (name === 'email') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				pattern: {
					value   : GLOBAL_CONSTANTS.regex_patterns.email,
					message : 'Email is invalid',
				},
			},
		};
	}

	if (name === 'mobile_number') {
		newControl = {
			...newControl,
			rules: {
				...(newControl.rules || {}),
				validate: (value) => (value.mobile_country_code && value.mobile_number
					? undefined
					: 'POC Mobile Number is Required'),
			},
		};
	}

	return newControl;
});

const getInvoiceTradePartyControls = ({
	organizationId,
	values,
	formState = {},
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	return configInvoiceTradePartyControls.map((control) => {
		const { name } = control;

		const value = getValue(newValues, name);

		if (name === 'organization_trade_party_id') {
			return {
				...control,
				params: {
					filters: {
						organization_id  : organizationId,
						trade_party_type : 'paying_party',
					},
					billing_address_data_required: true,
				},
				value,
			};
		}

		return { ...control, value };
	});
};

const getIsAddressRegisteredUnderGstControls = ({
	values,
	formState = {},
	organizationCountryId,
}) => {
	let newValues = formState;

	const configIsRegisteredUnderGstControls = getAddressRegisteredUnderGst({
		organizationCountryId,
	});

	if (!isEmpty(values)) {
		newValues = values;
	}

	return configIsRegisteredUnderGstControls.map((control) => {
		const { name } = control;

		let value = getValue(newValues, name, '');

		if (control.name === 'isAddressRegisteredUnderGst') {
			value = value ? [value] : [];
		}

		return { ...control, value };
	});
};

const getAddressControls = ({
	values,
	formState = {},
	gstinOptions,
	organizationCountryId,
}) => {
	let newValues = formState;
	if (!isEmpty(values)) {
		newValues = values;
	}

	const addressControls = getAddressNewControls({ organizationCountryId });

	return addressControls.map((control) => {
		const { name, type } = control;

		const value = newValues?.[name];

		console.log('value', value);

		let newControl = { ...control, value };

		if (name === 'gst_list') {
			newControl = {
				...newControl,
				label: isEmpty(gstinOptions) ? (
					''
				) : (
					<>
						Select
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
					</>
				),
				options: gstinOptions,
			};
		}

		if (name === 'is_sez') {
			newControl.value = value ? [true] : [];
		}

		if (type === 'file-uploader' && value) {
			newControl.value = value;
		}

		return newControl;
	});
};

const getPocFieldArray = ({ action, showSavedPOC, values, formState }) => {
	let pocDetailsValues = [];

	if (action === 'create') {
		pocDetailsValues = [];

		const HASH = {};
		pocControls.forEach((control) => {
			const { name } = control;

			HASH[name] = '';

			if (name === 'mobile_number') {
				HASH[name] = {};
			}
		});

		pocDetailsValues = [HASH];
	}

	const getPocDetailsValues = ({ dataList }) => dataList.map((value) => {
		const HASH = {};
		pocControls.forEach((control) => {
			const { name } = control;

			HASH[name] = getValue(value, name, '');

			if (name === 'mobile_number') {
				HASH[name] = {
					mobile_country_code : getValue(value, 'mobile_country_code', ''),
					mobile_number       : getValue(value, 'mobile_number', ''),
				};
			}
		});

		return HASH;
	});

	if (action === 'edit' && showSavedPOC) {
		pocDetailsValues = getPocDetailsValues({ dataList: values });
	}

	if (isEmpty(values) && !isEmpty(formState)) {
		pocDetailsValues = getPocDetailsValues({ dataList: formState });
	}

	return [
		{
			type     : 'fieldArray',
			name     : 'poc_details',
			label    : 'POC Details',
			controls : pocControls,
			value    : pocDetailsValues,
		},
	];
};

export const getControls = ({
	organizationId,
	action,
	values,
	showSavedPOC,
	formState,
	gstinOptions = [],
	organizationCountryId,
}) => {
	const {
		organization_trade_party_id: formStateTradePartyId,
		isAddressRegisteredUnderGst: formStateIsAddressRegisteredUnderGst,
		poc_details: formStatePocDetails,
		...formStateAddressData
	} = formState || {};

	const tradePartyId = getValue(values, 'tradePartyId');

	const isAddressRegisteredUnderGst = getValue(
		values,
		'isAddressRegisteredUnderGst',
	);

	const addressData = getValue(values, 'addressData', {});
	const pocDetails = getValue(addressData, 'organization_pocs', []);

	return {
		invoiceTradePartyControls: getInvoiceTradePartyControls({
			organizationId,
			values: {
				organization_trade_party_id: tradePartyId,
			},
			formState: {
				organization_trade_party_id: formStateTradePartyId,
			},
		}),
		isRegisteredUnderGstControls: getIsAddressRegisteredUnderGstControls({
			values: {
				isAddressRegisteredUnderGst,
			},
			formState: {
				isAddressRegisteredUnderGst: formStateIsAddressRegisteredUnderGst,
			},
			organizationCountryId,
		}),
		addressControls: getAddressControls({
			gstinOptions,
			values    : addressData,
			formState : formStateAddressData || {},
			organizationCountryId,
		}),
		pocFieldArrayControls: getPocFieldArray({
			action,
			showSavedPOC,
			values    : pocDetails,
			formState : formStatePocDetails || [],
		}),
	};
};
