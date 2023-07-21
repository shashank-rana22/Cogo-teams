import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getPayload from '../utils/getPayload';

interface AddressInterface {
	pincode?: number | string;
	address?: string;
	cityName?: string;
	countryName?: string;
	countryCode?: number | string;
	countryId?: number | string;
	taxNumber?: number | string;
	branchId?: number | string;
}

const useCreateExpense = ({ formData, setShowModal, getList }) => {
	const [addressData, setAddressData] = useState<AddressInterface>({});
	const { profile } = useSelector((state: any) => state);

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
	} = formData || {};

	const {
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
		ifsc_code: ifscCode,
		account_number: accountNumber,
		id: bankId,
		vendor_id: collectionPartyId,
	} = bankDetails?.[0] || {};

	const [{ data: responseData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'post',
			authKey : 'post_purchase_expense',
		},
		{ manual: true },
	);

	const payload = getPayload({
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
	});

	const submitData = async () => {
		try {
			await trigger({
				data: payload,
			});
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
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
