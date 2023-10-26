import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const HOUR_COUNT = 24;
const MINUTE_COUNT = 60;
const SECOND_COUNT = 60;
const DEFAULT_ZERO_VALUE = 0;
const TOTAL_TIME_COUNT = 1000;
const DEFAULT_TDS_RATE = 1;

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
	sidTradeParty,
	isTaxApplicable,
	nameTradeParty,
	pincode,
	cityName,
	countryNameTradeParty,
	taxNumber,
	tradePartyMappingId,
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
	dueDate,
	accountHolderName,
}) => {
	const lineItemsData = (lineItemsList || []).map((lineItem) => {
		if (lineItem?.tax) {
			const { code, serviceName, productCode } = JSON.parse(lineItem?.tax) || {};

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
					creditDays:
						Math.ceil(Math.abs(new Date(dueDate)
							- new Date(invoiceDate))
							/ (HOUR_COUNT * MINUTE_COUNT * SECOND_COUNT * TOTAL_TIME_COUNT)) || DEFAULT_ZERO_VALUE,
					exchangeRate    : null,
					ledgerCurrency,
					billDocumentUrl : uploadedInvoice,
					billNumber      : invoiceNumber,
				},
				sellerDetail: {
					// tradeParty
					tradePartyMappingId,
					entityCode           : entityCodeTradeParty,
					entityCodeId         : entityIdTradeParty,
					organizationId       : tradePartyMappingIdFromTradeParty,
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
							: taxNumber,
					tdsRate    : tdsTradeParty || DEFAULT_TDS_RATE,
					bankDetail : {
						bankName,
						beneficiaryName: accountHolderName || vendorName,
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
					tradePartyMappingId,
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
					taxNumber,
					tdsRate              : tdsTradeParty || DEFAULT_TDS_RATE,
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
