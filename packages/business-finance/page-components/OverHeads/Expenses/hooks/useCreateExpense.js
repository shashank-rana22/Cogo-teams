import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getPayload from '../utils/getPayload';

const useCreateExpense = ({
	taxNumber = '',
	formData = {},
	setShowModal = () => {}, getList = () => {},
}) => {
	const { profile } = useSelector((state) => state);
	const [addressData, setAddressData] = useState({});

	const {
		stakeholderId,
		stakeholderEmail,
		stakeholderName,
		vendorID,
		vendorName,
		vendorSerialId,
		invoiceDate,
		invoiceCurrency,
		uploadedInvoice,
		invoiceNumber,
		entityObject,
		vendorData,
		expenseCategory,
		branch,
		lineItemsList,
		tradeParty,
		remarks,
		categoryName,
		dueDate,
	} = formData || {};

	const {
		id: tradePartyMappingId = '',
		entity_code: entityCodeTradeParty,
		cogo_entity_id: entityIdTradeParty,
		organization_id: orgIdTradeParty,
		serial_id: sidTradeParty,
		business_name: nameTradeParty,
		country: tradePartyCountry,
		registration_number: registrationNumberTradeParty,
		tds_deduction_rate: tdsTradeParty,
		organization_trade_party_detail_id: tradePartyMappingIdFromTradeParty,
		is_tax_applicable: isTaxApplicable,
	} = tradeParty || {};

	const {
		country_code: countryCodeTradeParty,
		id: countryIdTradeParty,
		name: countryNameTradeParty,
	} = tradePartyCountry || {};

	const branchId = JSON.parse(formData?.branch || '{}')?.branchId;

	const { name: branchName } = JSON.parse(branch || '{}') || {};

	const {
		entity_code: entityCode,
		id,
		serial_id: serialId,
		business_name: businessName,
		addresses,
		registration_number: registrationNumber,
		cin,
		ledger_currency: ledgerCurrency,
	} = entityObject || {};

	useEffect(() => {
		if (!isEmpty(addresses)) {
			const singleAddress = addresses?.[GLOBAL_CONSTANTS.zeroth_index];
			if (singleAddress) {
				setAddressData({
					pincode     : singleAddress?.pin_code,
					address     : singleAddress?.address,
					cityName    : singleAddress?.city?.name,
					countryName : singleAddress?.country?.name,
					countryCode : singleAddress?.country?.country_code,
					countryId   : singleAddress?.country_id,
					taxNumber   : singleAddress?.gst_number,
					branchId    : singleAddress?.city_id,
				});
			}
		}
	}, [branchId, addresses]);

	const {
		country_id: vendorCountryId,
		registration_number: vendorRegistrationNumber,
		serial_id: vendorSid,
		business_name: vendorBusinessName,
		cogo_entity_id: vendorCogoEntityId,
		kyc_status: kycStatus,
		registration_type: registrationType,
		id: idFromVendor,
		bank_details: bankDetails = [],
		pincode,
		city_name: cityName,
	} = vendorData || {};

	const {
		bank_name: bankName,
		account_holder_name: accountHolderName,
		ifsc_code: ifscCode,
		account_number: accountNumber,
		id: bankId,
		vendor_id: collectionPartyId,
	} = bankDetails?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [{ data: responseData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'post',
			authKey : 'post_purchase_expense',
		},
		{ manual: true },
	);

	const payload = getPayload({
		taxNumber,
		vendorID,
		vendorName,
		vendorSerialId,
		profile,
		invoiceDate,
		branchName,
		invoiceCurrency,
		ledgerCurrency,
		uploadedInvoice,
		invoiceNumber,
		tradePartyMappingIdFromTradeParty,
		tradePartyMappingId,
		entityCodeTradeParty,
		entityIdTradeParty,
		orgIdTradeParty,
		sidTradeParty,
		isTaxApplicable,
		nameTradeParty,
		pincode,
		cityName,
		countryNameTradeParty,
		countryCodeTradeParty,
		countryIdTradeParty,
		registrationType,
		registrationNumberTradeParty,
		tdsTradeParty,
		bankName,
		ifscCode,
		accountNumber,
		bankId,
		collectionPartyId,
		entityCode,
		id,
		serialId,
		businessName,
		addressData,
		registrationNumber,
		cin,
		vendorCogoEntityId,
		idFromVendor,
		vendorSid,
		vendorBusinessName,
		vendorCountryId,
		vendorRegistrationNumber,
		expenseCategory,
		stakeholderEmail,
		stakeholderId,
		stakeholderName,
		kycStatus,
		lineItemsList,
		expenseType            : 'NON_RECURRING',
		expenseConfigurationId : null,
		remarks,
		categoryName,
		dueDate,
		accountHolderName,
	});

	const submitData = async () => {
		try {
			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	if (responseData?.message === 'OK') {
		Toast.success('Expense successfully created');
		setShowModal(false);
		getList(); // refetching the list
	}

	return {
		loading,
		submitData,
	};
};

export default useCreateExpense;
