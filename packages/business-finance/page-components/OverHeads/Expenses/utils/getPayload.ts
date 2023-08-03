import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getPayload = ({
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
	expenseType,
	expenseConfigurationId,
	remarks,
	categoryName,
}) => {
	const lineItemsData = (lineItemsList || []).map((lineItem: any) => {
		if (lineItem?.tax) {
			const { code, serviceName, productCode } =				JSON.parse(lineItem?.tax) || {};

			return {
				unit                : '',
				price               : lineItem?.amount_before_tax,
				name                : lineItem?.itemName,
				code,
				serviceName,
				quantity            : '1',
				priceInBillCurrency : invoiceCurrency,
				discount            : 0,
				productCode,
				taxPercent          : JSON.parse(lineItem?.tax || '{}')?.taxPercent,
				exchangeRate        : 1,
				currencyCode        : invoiceCurrency,
				lineItemAdditional  : {
					taxPercent : JSON.parse(lineItem?.tax || '{}')?.taxPercent,
					tdsAmount  : lineItem?.tdsAmount,
					tdsPercent : lineItem?.tds,
				},
				createdBy: profile?.user?.id,
			};
		}
		return null;
	});
	return {
		expenseConfigurationId : expenseConfigurationId || undefined, // only for case of recurring
		request                : {
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
					billDate: formatDate({
						date       : invoiceDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
						formatType : 'dateTime',
						separator  : ' ',
					}),
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
				sellerDetail: {
					// tradeParty
					tradePartyMappingId  : tradePartyMappingIdFromTradeParty,
					entityCode           : entityCodeTradeParty,
					entityCodeId         : entityIdTradeParty,
					organizationId       : orgIdTradeParty,
					organizationSerialId : sidTradeParty,
					isTaxApplicable:
						isTaxApplicable === null ? true : isTaxApplicable,
					isSez              : false,
					organizationName   : nameTradeParty,
					pincode,
					address            : cityName,
					cityName,
					supplyAgent        : nameTradeParty,
					zone               : 'EAST',
					countryName        : countryNameTradeParty,
					countryCode        : countryCodeTradeParty,
					countryId          : countryIdTradeParty,
					registrationNumber : registrationNumberTradeParty,
					taxNumber:
						registrationType === 'tax'
							? registrationNumberTradeParty
							: null,
					tdsRate    : tdsTradeParty || 1,
					bankDetail : {
						bankName,
						beneficiaryName: bankName,
						ifscCode,
						accountNumber,
						bankId,
						collectionPartyId,
					},
				},
				buyerDetails: {
					// cogo entity
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
				serviceProviderDetail: {
					// vendor
					tradePartyMappingId  : tradePartyMappingIdFromTradeParty,
					entityCode,
					entityCodeId         : vendorCogoEntityId,
					organizationId       : idFromVendor || vendorID,
					organizationSerialId : vendorSid,
					isSez                : false,
					organizationName     : vendorBusinessName,
					businessName         : vendorBusinessName,
					pincode,
					address              : cityName,
					cityName,
					countryName          : countryNameTradeParty,
					countryCode          : countryCodeTradeParty,
					countryId            : vendorCountryId,
					registrationNumber   : vendorRegistrationNumber,
					taxNumber            : vendorRegistrationNumber,
					tdsRate              : tdsTradeParty || 1,
				},
				lineItems: lineItemsData,
			},
			createdBy           : profile?.user?.id,
			performedByUserType : 'AGENT',
		},
		categoryId     : expenseCategory,
		approvedByUser : {
			userEmail : stakeholderEmail,
			userId    : stakeholderId,
			userName  : stakeholderName,
		},
		expenseType,
		branchName,
		categoryName,
		incidentSubType : categoryName,
		branchId        : addressData?.branchId,
		kycStatus       : kycStatus?.toUpperCase(),
		pan             : vendorRegistrationNumber,
		remarks,
		documents       : uploadedInvoice,
		createdBy       : profile?.user?.id,
	};
};

export default getPayload;
