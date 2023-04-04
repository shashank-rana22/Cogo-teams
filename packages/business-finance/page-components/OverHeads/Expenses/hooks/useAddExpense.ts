import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getPayload from '../utils/getPayload';

interface AddressInterface {
	pincode?:number | string,
	address?:string,
	cityName?:string,
	countryName?:string,
	countryCode?:number | string,
	countryId?:number | string,
	taxNumber?:number | string,
	branchId?:number | string,
}

const useAddExpense = ({ expenseData, setShowModal, getList, rowData }) => {
	const {
		vendorId:vendorID, businessName:vendorName, id:expenseConfigurationId,
		category:expenseCategory,
		subCategory:expenseSubCategory,
	} = rowData || {};

	const [addressData, setAddressData] = useState<AddressInterface>({});
	const {
		profile,
	} = useSelector((state:any) => state);

	const {
		stakeholderId,
		stakeholderEmail,
		stakeholderName,
		vendorData,
		invoiceDate,
		invoiceCurrency,
		uploadedInvoice,
		invoiceNumber,
		entityObject,
		branch,
		lineItemsList,
		tradeParty,
	} = expenseData || {};

	const {
		entity_code:entityCodeTradeParty,
		cogo_entity_id:entityIdTradeParty,
		organization_id:orgIdTradeParty,
		serial_id:sidTradeParty,
		business_name:nameTradeParty,
		country:tradePartyCountry,
		registration_number:registrationNumberTradeParty,
		tds_deduction_rate:tdsTradeParty,
		organization_trade_party_detail_id:tradePartyMappingIdFromTradeParty,
		is_tax_applicable:isTaxApplicable,
	} = tradeParty || {};

	const {
		country_code:countryCodeTradeParty,
		id:countryIdTradeParty,
		name:countryNameTradeParty,
	} = tradePartyCountry || {};

	const { name:branchName, branchId } = branch || {};

	const {
		entity_code:entityCode,
		id,
		serial_id:serialId,
		business_name: businessName,
		addresses,
		registration_number: registrationNumber,
		cin,
		ledger_currency: ledgerCurrency,
	} = entityObject || {};

	useEffect(() => {
		if (addresses?.length > 0) {
			const singleAddress = addresses?.[0];
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
		serial_id:vendorSerialId,
		kyc_status:kycStatus,
		registration_type:registrationType,
		bank_details:bankDetails,
		pincode,
		city_name:cityName,
		id:idFromVendor,
	} = vendorData || {};

	const [{ data:responseData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'post',
			authKey : 'post_purchase_expense',
		},
		{ manual: true },
	);

	const {
		bank_name:bankName, ifsc_code:ifscCode,
		account_number:accountNumber,
		id:bankId,
		vendor_id:collectionPartyId,
	} = bankDetails?.[0] || {};

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
		expenseSubCategory,
		stakeholderEmail,
		stakeholderId,
		stakeholderName,
		kycStatus,
		lineItemsList,
		expenseType: 'RECURRING',
		expenseConfigurationId,
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
		Toast.success('Expense successfully added');
		setShowModal(false);
		getList(); // refetching the list
	}

	return {
		loading,
		submitData,
	};
};

export default useAddExpense;
