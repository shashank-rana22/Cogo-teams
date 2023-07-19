/* eslint-disable max-lines-per-function */

import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import {
	CountrySpecificData,
	getCountrySpecificData,
} from '@cogoport/globalization/utils/CountrySpecificDetail';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { getControls as getActualControl } from '../utils/controls';
import getValue from '../utils/getValue';

import useGetBusiness from './useGetBusiness';
import useGetGstInListByPan from './useGetGstInListByPan';
import useSaveAddress from './useSaveAddress';

const ONE = 1;
const TWO = 2;

const getControls = ({
	gstinOptions,
	showInvoiceTradeParty,
	action,
	organizationId,
	values,
	showSavedPOC,
	formState,
	organizationCountryId,
}) => {
	const {
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
	} = getActualControl({
		gstinOptions,
		organizationId,
		action,
		values,
		showSavedPOC,
		formState,
		organizationCountryId,
	});

	return {
		invoiceTradePartyControls: showInvoiceTradeParty
			? invoiceTradePartyControls
			: [],
		isRegisteredUnderGstControls:
			action === 'create' ? isRegisteredUnderGstControls : [],
		addressControls,
		pocFieldArrayControls,
	};
};

const getAddressShowElements = ({
	controls,
	addressType,
	isSez,
	isGstNumberSelected,
	isAddressRegisteredUnderGstChecked,
	action,
}) => {
	const HASH = {};
	controls.forEach((control) => {
		const { name, showIn } = control;

		let showElement = showIn.includes(addressType);

		if (showElement) {
			if (
				(name === 'sez_proof' && !isSez)
				|| (action === 'edit' && name === 'gst_list')
			) {
				showElement = false;
			}
		}

		if (isAddressRegisteredUnderGstChecked) {
			if (name === 'gst_list') {
				showElement = false;
			}
		} else if (
			!isGstNumberSelected
			&& name !== 'gst_list'
			&& addressType === 'billingAddress'
		) {
			showElement = false;
		}

		HASH[name] = showElement;
	});

	return HASH;
};

const getLayouts = ({
	invoiceTradePartyControls,
	isRegisteredUnderGstControls,
	addressControls,
	pocFieldArrayControls,
	addressType,
	isSez,
	isGstNumberSelected,
	gstinOptions,
	isAddressRegisteredUnderGstChecked,
	action,
}) => ({
	tradeParty: {
		controls: invoiceTradePartyControls,
	},
	registeredUnderGst: {
		controls: isRegisteredUnderGstControls,
	},
	address: {
		title        : 'Billing Address',
		controls     : addressControls,
		showElements : getAddressShowElements({
			controls: addressControls,
			addressType,
			isSez,
			isGstNumberSelected,
			gstinOptions,
			isAddressRegisteredUnderGstChecked,
			action,
		}),
	},
	poc: {
		title: 'POC Details',
		controls:
			isAddressRegisteredUnderGstChecked || isGstNumberSelected
				? pocFieldArrayControls
				: [],
	},
});

const formatPocDetails = ({ data }) => data.map((poc) => ({
	name                : getValue(poc, 'name'),
	email               : getValue(poc, 'email'),
	mobile_country_code : poc?.mobile_number?.mobile_country_code,
	mobile_number       : poc?.mobile_number?.mobile_number,
}));

const getAddressValues = ({ data, controls, addressType }) => {
	const VALUES_HASH = {};
	controls.forEach((control) => {
		const { name, showIn } = control;

		if (!showIn.includes(addressType)) {
			return;
		}

		let value = data[name];

		if (name === 'is_sez') {
			value = !isEmpty(value);
		}

		console.log('data', data);

		if (name === 'tax_number_document_url') {
			value =				data?.tax_number_document_url?.finalUrl
				|| data?.tax_number_document_url;
		}

		if (name === 'sez_proof') {
			value = data?.sez_proof?.finalUrl || data?.sez_proof;
		}

		VALUES_HASH[name] = value;
	});

	return VALUES_HASH;
};

const formatValues = ({ values, addressControls, addressType }) => {
	const { isAddressRegisteredUnderGst } = values;

	return {
		organization_trade_party_id: getValue(
			values,
			'organization_trade_party_id',
		),
		isAddressRegisteredUnderGst: !isEmpty(isAddressRegisteredUnderGst),
		...getAddressValues({
			data     : values,
			controls : addressControls,
			addressType,
		}),
		poc_details: formatPocDetails({
			data: getValue(values, 'poc_details', []),
		}),
	};
};

const useSaveAddressForm = (props) => {
	const {
		organizationId,
		tradePartyId,
		isAddressRegisteredUnderGst,
		addressData,
		addressType,
		showInvoiceTradeParty = false,
		onSuccess,
		onFailure,
		saveAddressData,
		showSavedPOC,
		formState,
		registrationNumber = '',
		validateGst = true,
		organizationCountryId,
		source = '',
	} = props;

	const action = isEmpty(addressData) ? 'create' : 'edit';

	const { gstinOptions = [], getCogoScoreTaxNumApi } = useGetGstInListByPan({
		registrationNumber,
		action,
	});

	const {
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
	} = getControls({
		gstinOptions,
		organizationId,
		showInvoiceTradeParty,
		action,
		values: {
			tradePartyId: showInvoiceTradeParty ? tradePartyId : '',
			isAddressRegisteredUnderGst,
			addressData,
		},
		showSavedPOC,
		formState,
		organizationCountryId,
	});

	const controls = [
		...invoiceTradePartyControls,
		...isRegisteredUnderGstControls,
		...addressControls,
		...pocFieldArrayControls,
	];

	const {
		general: { unPrefixedPath = '' },
	} = useSelector((ReduxState) => ReduxState);
	const crm = unPrefixedPath.split('/')[TWO];
	let newControls = controls;
	if (crm !== 'supply' || action === 'edit') {
		newControls = controls.filter(
			(ctrl) => ctrl.name !== 'organization_branch_id',
		);
	}

	const formProps = useForm();

	const { watch, getValues, setValue } = formProps;

	const fields = newControls.reduce(
		(acc, curr) => ({ ...acc, [curr.name]: curr }),
		{},
	);

	const watchIsSez = watch('is_sez');
	const watchGstList = watch('gst_list') || '';
	const watchPincode = watch('pincode');
	const watchIsAddressRegisteredUnderGst = watch('isAddressRegisteredUnderGst');

	const { getBusinessApi = {} } = useGetBusiness({
		watchTaxNumber         : watchGstList.toUpperCase(),
		setValue,
		registrationNumberType : 'tax',
		action,
	});

	const isAddressRegisteredUnderGstChecked = !isEmpty(
		watchIsAddressRegisteredUnderGst,
	);

	let updatedAddressType = addressType;
	if (action === 'create') {
		updatedAddressType = isAddressRegisteredUnderGstChecked
			? 'otherAddress'
			: 'billingAddress';
	}

	const { loading, saveAddress } = useSaveAddress({
		organizationId,
		tradePartyId,
		addressData,
		addressType: updatedAddressType,
		action,
		onSuccess,
		onFailure,
		showSavedPOC,
		source,
	});
	if (fields?.organization_branch_id) {
		fields.organization_branch_id.params = {
			filters: { organization_id: organizationId || undefined },
		};
	}

	const onSubmit = (values) => {
		if (addressData?.verification_status === 'pending_from_approval') {
			Toast.error('Cannot edit while its under verification');
			return;
		}

		const pocDetails = getValue(values, 'poc_details', []);

		if (action === 'create') {
			if (isEmpty(pocDetails)) {
				Toast.info('Please create at-least one POC before proceeding ');

				return;
			}
		}

		const newValues = formatValues({
			values,
			addressControls,
			addressType: updatedAddressType,
		});

		if (!saveAddressData) {
			onSuccess({
				values: newValues,
			});

			return;
		}

		saveAddress({ values: newValues });
	};

	const layouts = getLayouts({
		invoiceTradePartyControls,
		isRegisteredUnderGstControls,
		addressControls,
		pocFieldArrayControls,
		addressType         : updatedAddressType,
		isSez               : !isEmpty(watchIsSez),
		isGstNumberSelected : !isEmpty(watchGstList),
		gstinOptions,
		isAddressRegisteredUnderGstChecked,
		action,
	});

	const NEW_FIELDS = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'tax_number') {
			newField = {
				...newField,
				label: validateGst ? (
					<>
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
						{' '}
						Number
					</>
				) : (
					'TAX Number'
				),
				maxLength: undefined,
				...(validateGst && {
					maxLength: 15,
				}),
				rules: {
					...(newField.rules || {}),
					pattern: {},
					...(validateGst && {
						pattern: {
							value: getCountrySpecificData({
								country_id   : organizationCountryId,
								accessorType : 'registration_number',
								accessor     : 'pattern',
							}),
							message: `${getCountrySpecificData({
								country_id   : organizationCountryId,
								accessorType : 'registration_number',
								accessor     : 'label',
							})} is invalid`,
						},
					}),
				},
				disabled: watchGstList !== 'gst_not_found',
			};
		}

		if (controlName === 'tax_number_document_url') {
			newField = {
				...newField,
				label: validateGst ? (
					<>
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
						{' '}
						Proof
					</>
				) : (
					'TAX Proof'
				),
			};
		}

		NEW_FIELDS[controlName] = newField;
	});

	useEffect(() => {
		setValue('gst_list', addressData?.tax_number);
		setValue('tax_number', addressData?.tax_number);
	}, [addressData?.tax_number, setValue]);

	useEffect(() => {
		setValue('gst_list', gstinOptions?.length > ONE ? null : 'gst_not_found');
	}, [gstinOptions?.length, setValue]);

	useEffect(() => {
		if (!isEmpty(formState)) {
			const {
				isAddressRegisteredUnderGst: isAddressRegisteredUnderGstValue,
				is_sez,
				poc_details = [],
				tax_number_document_url = '',
				...restValues
			} = formState;
			if (isAddressRegisteredUnderGstValue) {
				setValue('isAddressRegisteredUnderGst', ['true']);
			}

			if (is_sez) {
				setValue('is_sez', ['true']);
			}

			Object.entries(restValues).forEach(([key, value]) => {
				setValue(key, value);
			});

			setValue('tax_number_document_url', tax_number_document_url);

			poc_details.forEach((detail, index) => {
				const { name, email, mobile_country_code, mobile_number } =					detail || {};

				const childKey = `poc_details.${index}`;

				setValue(`${childKey}.name`, name);
				setValue(`${childKey}.email`, email);
				setValue(`${childKey}.mobile_number`, {
					mobile_country_code,
					mobile_number,
				});
			});
		}
	}, [formState, setValue, getCogoScoreTaxNumApi.loading]);

	return {
		loading,
		layouts,
		formProps          : { ...formProps, fields: NEW_FIELDS, controls: newControls },
		errors             : formProps.formState.errors,
		onSubmit,
		getFormattedValues : () => formatValues({
			values      : getValues(),
			addressControls,
			addressType : updatedAddressType,
		}),
		getBusinessApi,
		gstinOptions,
		getCogoScoreTaxNumApi,
		watchPincode,
		watchGstList,
		isAddressRegisteredUnderGstChecked,
	};
};

export default useSaveAddressForm;
