import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { formatDate } from '../../../../commons/utils/formatDate';

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

			addresses.forEach((address) => {
				const { city_id:cityId } = address || {};

				if (cityId === branchId) {
					setAddressData({
						pincode     : address?.pin_code,
						address     : address?.address,
						cityName    : address?.city?.name,
						countryName : address?.country?.name,
						countryCode : address?.country?.country_code,
						countryId   : address?.country_id,
						taxNumber   : address?.gst_number,
						branchId    : address?.city_id,
					});
				}
			});
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
	} = vendorData || {};

	const [{ data:responseData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'post',
			authKey : 'post_purchase_expense',
		},
		{ manual: true },
	);

	const payload = {
		expenseConfigurationId,
		request: {
			job: {
				jobSource   : 'OVERHEAD',
				jobType     : 'EXPENSE',
				referenceId : '',
				jobDetails  : {
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
					tradePartyMappingId     : '4ff54f88-0024-4de9-8ebd-2c72c80aeaa3', // ???
					entityCode              : tradeParty?.entity_code,
					entityCodeId            : tradeParty?.cogo_entity_id,
					organizationId          : tradeParty?.organization_id,
					organizationSerialId    : tradeParty?.serial_id,
					// isTaxApplicable         : tradeParty?.is_tax_applicable,
					isTaxApplicable         : true, // for now
					isSez                   : false,
					organizationName        : 'JAMA TAXI SERVICE', // ???
					pincode                 : '110062', // ??
					address                 : 'D-296,JJ COLONY KHANPUR,DR AMBEDKAR NAGAR SOUTH DELHI-110062', // ??
					cityName                : '', // ??
					supplyAgent             : 'Ajit Kumar', // ??
					zone                    : 'NORTH', // ??
					countryName             : tradeParty?.country?.display_name,
					countryCode             : tradeParty?.country?.country_code,
					countryId               : tradeParty?.country?.id,
					registrationNumber      : tradeParty?.registration_number,
					taxNumber               : '', // ??
					corporateIdentityNumber : '', // ??
					tdsRate                 : tradeParty?.tds_deduction_rate || 0,
					logoUrl                 : '', // ??
					signatureUrl            : '', // ??
					bankDetail              : { // ??
						bankName          : 'STATE BANK OF INDIA',
						branchCode        : 'SBIN0017891',
						beneficiaryName   : 'STATE BANK OF INDIA',
						ifscCode          : 'SBIN0017891',
						accountNumber     : '65009402357',
						swiftCode         : '',
						bankId            : '9000895a-fabb-4adf-8a6c-7d006da1c6aa',
						currency          : 'GBP',
						collectionPartyId : '',
						imageUrl          : 'url',
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
					organizationId          : id,
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
					taxNumber               : '', // ????
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
			email : stakeholderEmail,
			id    : stakeholderId,
			name  : stakeholderName,
		},
		expenseType : 'RECURRING',
		branchId    : addressData?.branchId,
		kycStatus   : kycStatus?.toUpperCase(),
		pan         : vendorRegistrationNumber,
	};

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
