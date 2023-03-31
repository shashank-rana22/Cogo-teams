const getPayload = ({ vendorID, vendorName, vendorSerialId }) => ({
	// expenseConfigurationId : 'example', only in case of recurring
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
				isTaxApplicable         : registrationType !== 'pan',
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
				organizationId          : tradeParty?.organization_id,
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
	expenseType : 'NON_RECURRING',
	branchId    : addressData?.branchId,
	kycStatus   : kycStatus?.toUpperCase(),
	pan         : vendorRegistrationNumber,
	createdBy   : profile?.user?.id,
});

export default getPayload;
