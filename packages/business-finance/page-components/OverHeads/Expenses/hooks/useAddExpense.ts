import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { formatDate } from '../../../commons/utils/formatDate';

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
		// id:vendorId,
		// bank_details:bankDetails = [],
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
	} = tradeParty || {};

	const {
		country_code:countryCodeTradeParty,
		id:countryIdTradeParty,
		name:countryNameTradeParty,
	} = tradePartyCountry || {};

	const { name:branchName, branchId } = branch || {};

	const lineItemsData = lineItemsList?.map((lineItem:any) => {
		if (lineItem?.tax) {
			const { code, serviceName, productCode } = JSON.parse(lineItem?.tax) || {};

			return ({
				unit                : '',
				price               : lineItem?.amount_before_tax,
				name                : lineItem?.itemName,
				code,
				// code                : 'ALFTL',
				serviceName,
				// serviceName         : 'overheads',
				quantity            : '2', // ?????????
				priceInBillCurrency : invoiceCurrency,
				discount            : 0,
				productCode,
				// productCode         : 'ALFTL0027',
				hsnCode             : null, // ?????????
				taxPercent          : JSON.parse(lineItem?.tax || '{}')?.taxPercent,
				// exchangeRate        : null,
				exchangeRate        : 1, // temporarily
				currencyCode        : invoiceCurrency,
				lineItemAdditional  : {
					taxPercent : JSON.parse(lineItem?.tax || '{}')?.taxPercent,
					totalPrice : '',
					tdsAmount  : lineItem?.tds,
				},
				createdBy: profile?.user?.id,
			});
		}
		return null;
	});

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
			// picking single address from entity data that matches to branch address

			// addresses.forEach((address) => {
			// 	const { city_id:cityId } = address || {};

			// 	if (cityId === branchId) {
			// 		setAddressData({
			// 			pincode     : address?.pin_code,
			// 			address     : address?.address,
			// 			cityName    : address?.city?.name,
			// 			countryName : address?.country?.name,
			// 			countryCode : address?.country?.country_code,
			// 			countryId   : address?.country_id,
			// 			taxNumber   : address?.gst_number,
			// 			branchId    : address?.city_id,
			// 		});
			// 	}
			// });

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

	const payload = {
		expenseConfigurationId,
		request: {
			job: {
				jobSource   : 'OVERHEAD',
				jobType     : 'EXPENSE',
				referenceId : '',
				// transactionDate : formatDate(transactionDate, 'yyyy-MM-dd', {}, false),

				jobDetails: {
					vendorDetails: {
						organizationId       : vendorID,
						organizationName     : vendorName,
						organizationSerialId : vendorSerialId,
					},
				},
			},
			billDetails: {
				jobSource           : 'OVERHEAD',
				jobType             : 'EXPENSE',
				performedByUserType : 'AGENT',
				serviceProviderType : 'vendor',
				createdBy           : profile?.user?.id,
				bill                : {
					billDate           : formatDate(invoiceDate, 'yyyy-MM-dd hh:mm:ss', {}, false),
					remarks            : '',
					ledgerExchangeRate : null,
					billType           : 'EXPENSE',
					isProforma         : false,
					proformaId         : '',
					isTaxable          : true,
					placeOfSupply      : branchName,
					billCurrency       : invoiceCurrency,
					creditDays         : 0,
					exchangeRate       : null,
					ledgerCurrency,
					billDocumentUrl    : uploadedInvoice,
					billNumber         : invoiceNumber,
				},
				sellerDetail: { // tradeParty
					entityCode           : entityCodeTradeParty,
					entityCodeId         : entityIdTradeParty,
					organizationId       : orgIdTradeParty,
					organizationSerialId : sidTradeParty,
					isTaxApplicable      : true,
					isSez                : false,
					organizationName     : nameTradeParty,
					pincode              : 123456, // should come from trade party
					address              : 'D-296,JJ', // should come from trade party
					cityName             : '', // ??// should come from trade party
					supplyAgent          : nameTradeParty,
					zone                 : 'NORTH', // ??// should come from trade party
					countryName          : countryNameTradeParty,
					countryCode          : countryCodeTradeParty,
					countryId            : countryIdTradeParty,
					registrationNumber   : registrationType === 'pan' ? registrationNumberTradeParty : null,
					taxNumber            : registrationType === 'tax' ? registrationNumberTradeParty : null,
					// corporateIdentityNumber : '', // ??
					tdsRate              : tdsTradeParty || 0,
					// logoUrl              : '', // ??
					// signatureUrl         : '', // ??
					bankDetail           : {
						bankName,
						beneficiaryName: bankName,
						ifscCode,
						accountNumber,
						bankId,
						collectionPartyId,
					},
				},
				buyerDetails: { // cogo entity
					entityCode,
					organizationId          : id,
					organizationSerialId    : serialId,
					isSez                   : false,
					organizationName        : businessName,
					businessName,
					pincode                 : addressData?.pincode,
					address                 : addressData?.address,
					entityCodeId            : id,
					cityName                : addressData?.cityName,
					countryName             : addressData?.countryName,
					countryCode             : addressData?.countryCode,
					countryId               : addressData?.countryId,
					registrationNumber,
					taxNumber               : addressData?.taxNumber,
					corporateIdentityNumber : cin,
					tdsRate                 : 0,
				},
				serviceProviderDetail: { // vendor
					entityCode,
					entityCodeId            : vendorCogoEntityId,
					organizationId          : vendorID,
					organizationSerialId    : vendorSid,
					isSez                   : false,
					organizationName        : vendorBusinessName,
					businessName            : vendorBusinessName,
					pincode                 : '', // ??????????
					address                 : '', // ??????????
					cityName                : '', // ??????????
					countryName             : '', // ??????????
					countryCode             : '', // ??????????
					countryId               : vendorCountryId,
					registrationNumber      : vendorRegistrationNumber,
					taxNumber               : vendorRegistrationNumber,
					corporateIdentityNumber : '', // ????
					tdsRate                 : '', // ????
				},
				lineItems: lineItemsData,
			},
			createdBy           : profile?.user?.id,
			performedByUserType : 'AGENT',
		},
		category       : expenseCategory?.toUpperCase(),
		subCategory    : expenseSubCategory?.toUpperCase(),
		approvedByUser : {
			userEmail : stakeholderEmail,
			userId    : stakeholderId,
			userName  : stakeholderName,
		},
		expenseType : 'RECURRING',
		branchId    : addressData?.branchId,
		kycStatus   : kycStatus?.toUpperCase(),
		pan         : vendorRegistrationNumber,
		createdBy   : profile?.user?.id,
	};

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
