import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, format } from '@cogoport/utils';

import { BILL_MAPPINGS, VERIFICATION_STATUS } from '../constants';

const DEFAULT_ZERO_VALUE = 0;
const DEFAULT_ONE_VALUE = 1;
const DEFAULT_ITEM_QUANTITY = 1;
const TAX_TOTAL_PERCENTAGE = 100;
const TDS_RATE = 2.0;
const HOUR_COUNT = 24;
const MINUTE_COUNT = 60;
const SECOND_COUNT = 60;
const TOTAL_TIME_COUNT = 1000;
const PIN_CODE_LENGTH = 30;

export const formatLineItems = (line_items, codes) => {
	const newLineItems = (line_items || []).map((item) => {
		const total = Number(item?.rate) * Number(item?.quantity || DEFAULT_ITEM_QUANTITY);
		const tax_total = (total * (codes?.[item?.code]?.tax_percent || DEFAULT_ZERO_VALUE)) / TAX_TOTAL_PERCENTAGE;
		const cost = (total || DEFAULT_ZERO_VALUE) + (tax_total || DEFAULT_ZERO_VALUE);

		const { tax_percent, service_name, trade_type, product_code, actualname } = codes?.[item?.code] || {};

		return {
			code                : item?.code,
			currencyCode        : item?.currency,
			currency            : item?.currency,
			priceInBillCurrency : item?.currency,
			price               : Number(item?.rate || DEFAULT_ZERO_VALUE),
			quantity            : Number(item?.quantity || DEFAULT_ITEM_QUANTITY),
			exchangeRate        : Number(item?.exchange_rate || DEFAULT_ITEM_QUANTITY),
			taxPercent          : tax_percent,
			taxPrice            : Number(tax_total || DEFAULT_ZERO_VALUE),
			discount            : '0',
			serviceName:
                ['fcl_freight', 'lcl_freight', 'air_freight'].includes(service_name)
                    && trade_type === 'LOCAL' ? `${service_name}_local` : service_name,
			productCode     : product_code,
			taxTotalPrice   : Number(cost || DEFAULT_ZERO_VALUE),
			name            : actualname || item?.actualname,
			unit            : item?.unit,
			containerNumber : item?.container_number || '',
		};
	});

	return newLineItems;
};

export const formatPurchaseLineItems = (line_items, codes) => {
	const newLineItems = (line_items || []).map((item) => {
		const total = Number(item?.rate || DEFAULT_ZERO_VALUE) * Number(item?.quantity || DEFAULT_ITEM_QUANTITY);
		const tax_total = (total * (codes?.[item?.code]?.tax_percent || DEFAULT_ZERO_VALUE)) / TAX_TOTAL_PERCENTAGE;
		const cost = (total || DEFAULT_ZERO_VALUE) + (tax_total || DEFAULT_ZERO_VALUE);

		const { tax_percent, service_name, trade_type, product_code, actualname } = codes?.[item?.code] || {};

		const {
			code,
			currency,
			rate,
			quantity,
			exchange_rate,
			service_name: serviceName,
			unit,
			container_number,
		} = item || {};

		return {
			code,
			currency_code          : currency,
			currency,
			price_in_bill_currency : currency,
			price                  : Number(rate || DEFAULT_ZERO_VALUE),
			quantity               : Number(quantity || DEFAULT_ITEM_QUANTITY),
			exchange_rate          : Number(exchange_rate || DEFAULT_ITEM_QUANTITY),
			tax_percent,
			tax_price              : Number(tax_total || DEFAULT_ZERO_VALUE),
			discount               : '0',
			service_name:
				['fcl_freight', 'lcl_freight', 'air_freight'].includes(service_name
					|| serviceName) && trade_type === 'LOCAL'
					? `${service_name || serviceName}_local` : service_name || serviceName,
			product_code,
			tax_total_price  : Number(cost || DEFAULT_ZERO_VALUE),
			name             : actualname || item?.actualname,
			unit,
			container_number : container_number || '',
		};
	});

	return newLineItems;
};

const validatePincode = (pincode, context) => {
	if (pincode?.length > PIN_CODE_LENGTH) {
		Toast.error(`Pincode Is Invalid For ${context}`);
		return false;
	}
	return true;
};

const validateIfsc = (ifsc, context) => {
	if (ifsc?.length > PIN_CODE_LENGTH) {
		Toast.error(`Ifsc Is Invalid For ${context}`);
		return false;
	}
	return true;
};

const validateBenificiaryName = (beneficiaryName) => {
	if (isEmpty(beneficiaryName)) {
		Toast.error('Benificiary name is not present');
		return false;
	}
	return true;
};

export const validateData = (data, extraData) => {
	const { billingPartyObj, collectionPartyObj, formValues } = extraData || {};
	const billingPartyAddress = (billingPartyObj?.addresses || []).find(
		(addr) => addr?.gst_number === data?.billing_party_address,
	);

	const allBillingAddresses = [
		...(collectionPartyObj?.billing_addresses || []),
		...(collectionPartyObj?.other_addresses || []),
	];

	const bank_details = (collectionPartyObj?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details'
			&& VERIFICATION_STATUS.includes(item?.verification_status)
			&& item?.status === 'active',
	);

	const bankDetails = (bank_details || []).find(
		(item) => item?.data?.bank_account_number === formValues?.collection_party_bank_details,
	);

	const collectionPartyBA = allBillingAddresses?.find(
		(address) => address?.id === formValues?.collection_party_address,
	) || {};
	if (!validatePincode(billingPartyAddress?.pin_code?.toString(), 'Buyer')) {
		return false;
	}
	if (!validatePincode(collectionPartyBA?.pincode?.toString(), 'Seller')) {
		return false;
	}
	if (!validateIfsc(bankDetails?.data?.ifsc_number?.toString(), 'Seller')) {
		return false;
	}
	if (!validateBenificiaryName(bankDetails?.data?.account_holder_name)) {
		return false;
	}
	return true;
};

export const formatCollectionPartyPayload = (data, extraData) => {
	const {
		billingPartyObj = {},
		collectionPartyObj = {},
		shipment_data = {},
		invoiceData = {},
		uploadProof = '',
		taggedProformas = [],
		formValues = {},
		ocrData = {},
		codes,
		activeTab,
		partyId,
		serviceProviderOrg = {},
		billId,
	} = extraData || {};

	const FORMAT_TAGGED_IDS = [];
	const FORMAT_ROOT_IDS = [];
	taggedProformas?.forEach((item) => {
		if (item?.finance_job_number || item?.billId) {
			FORMAT_TAGGED_IDS.push(item?.finance_job_number || item?.billId);
			if (item.finance_job_number) {
				FORMAT_ROOT_IDS.push(item.finance_job_number);
			}
		} else {
			item?.root?.split(',')?.forEach((id) => {
				FORMAT_TAGGED_IDS.push(id);
				FORMAT_ROOT_IDS.push(id);
			});
		}
	});
	const uniqueIds = new Set(FORMAT_ROOT_IDS);
	let rootBillIds = '';
	[...uniqueIds].forEach((element, index) => {
		const isLast = index === ([...uniqueIds]?.length || DEFAULT_ZERO_VALUE) - DEFAULT_ONE_VALUE;
		const idbill = isLast ? `${element}` : `${element},`;
		rootBillIds += idbill;
	});

	const rooBill = taggedProformas?.map(
		(item) => item?.finance_job_number || item.root,
	);

	const bank_details = (collectionPartyObj?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details'
            && ['pending', 'verified'].includes(item?.verification_status)
            && item?.status === 'active',
	);

	const bankDetails = (bank_details || []).find(
		(item) => item?.data?.bank_account_number === formValues?.collection_party_bank_details,
	);
	const billingpartyAddress = (billingPartyObj.addresses || []).find(
		(addr) => addr?.gst_number === data?.billing_party_address,
	);
	const allBillingAddresses = [
		...(collectionPartyObj?.billing_addresses || []),
		...(collectionPartyObj?.other_addresses || []),
	];
	const billType = activeTab === 'pass_through' ? 'REIMBURSEMENT' : BILL_MAPPINGS[formValues?.invoice_type];
	const isTagginsAllowed = billType === 'BILL';
	const collectionPartyBA = allBillingAddresses?.find(
		(address) => address?.id === formValues?.collection_party_address,
	) || {};
	const collectionPartyPOC = collectionPartyObj?.poc_data?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const rootid = taggedProformas?.length === DEFAULT_ONE_VALUE
		? rooBill?.[GLOBAL_CONSTANTS.zeroth_index] : rootBillIds || undefined;

	const finalData = {
		jobSource           : 'LOGISTICS',
		jobNumber           : shipment_data?.serial_id,
		jobType             : 'SHIPMENT',
		serviceProviderType : 'freight_forwarder',
		hasPayrun           : false,
		isProforma          : formValues?.invoice_type === 'proforma_invoice',
		bill                : {
			id: billId,
			billType,
			billStatus:
                extraData?.invoiceStatus === 'init' ? 'INITIATED' : extraData?.invoiceStatus?.toUpperCase(),
			isProforma : formValues?.invoice_type === 'proforma_invoice',
			isTaxable  : collectionPartyObj?.is_tax_applicable,
			billDate   : format(
				data.invoice_date || formValues?.invoice_date,
				`${GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']} ${GLOBAL_CONSTANTS.formats.time['hh:mm:ss']}`,
				{},
				true,
			),
			placeOfSupply : formValues?.place_of_supply,
			billCurrency  : formValues?.invoice_currency || ocrData?.invoice_currency,
			creditDays:
                Math.ceil(Math.abs(new Date(formValues?.due_date)
                        - new Date(formValues?.invoice_date))
                    / (HOUR_COUNT * MINUTE_COUNT * SECOND_COUNT * TOTAL_TIME_COUNT)) || DEFAULT_ZERO_VALUE,

			billDocumentUrl : uploadProof,
			billNumber      : data?.tax_invoice_no.trim(),
			refBillId:
				formValues?.invoice_type === 'credit_note' ? formValues?.ref_invoice_no : undefined,
		},
		buyerDetails: {
			entityCode              : billingPartyObj?.entity_code,
			organizationId          : billingPartyObj?.id,
			organizationSerialId    : billingPartyObj?.serial_id,
			organizationName        : billingPartyObj?.business_name,
			businessName            : billingPartyObj?.business_name,
			pincode                 : billingpartyAddress?.pin_code,
			address                 : billingpartyAddress?.address,
			entityCodeId            : billingPartyObj?.id,
			cityName                : billingpartyAddress?.city?.name || '',
			countryName             : billingpartyAddress?.country?.name || '',
			countryCode             : billingpartyAddress?.country?.country_code,
			countryId               : billingpartyAddress?.country_id,
			registrationNumber      : billingPartyObj?.registration_number,
			taxNumber               : billingpartyAddress?.gst_number,
			isSez                   : false,
			tradePartyMappingId     : collectionPartyObj?.id,
			corporateIdentityNumber : billingPartyObj?.cin,
			tdsRate                 : collectionPartyObj?.tds_deduction_rate,
			tdsType                 : collectionPartyObj?.tds_deduction_type,
			tdsStyle                : collectionPartyObj?.tds_deduction_style?.toUpperCase(),
		},
		sellerDetail: {
			id                      : collectionPartyObj?.id,
			tradePartyMappingId     : collectionPartyObj?.id,
			entityCode              : collectionPartyObj?.entity_code,
			entityCodeId            : collectionPartyObj?.cogo_entity_id,
			organizationId          : collectionPartyObj?.organization_trade_party_detail_id,
			organizationSerialId    : collectionPartyObj?.serial_id,
			isTaxApplicable         : collectionPartyObj?.is_tax_applicable,
			isSez                   : collectionPartyBA?.is_sez || false,
			organizationName        : collectionPartyObj?.business_name,
			pincode                 : collectionPartyBA?.pincode,
			address                 : collectionPartyBA?.address,
			cityName                : collectionPartyBA?.cityName || '',
			countryName             : collectionPartyObj?.country?.name || '',
			countryCode             : collectionPartyObj?.country?.country_code,
			countryId               : collectionPartyObj?.country_id,
			registrationNumber      : collectionPartyObj?.registration_number,
			taxNumber               : collectionPartyBA?.tax_number || collectionPartyBA?.gst_number,
			corporateIdentityNumber : billingPartyObj?.cin,
			tdsRate                 : isEmpty(collectionPartyObj?.tds_deduction_rate)
				? TDS_RATE
				: collectionPartyObj?.tds_deduction_rate,
			logoUrl           : collectionPartyBA?.billingAddress?.logoUrl,
			signatureUrl      : collectionPartyBA?.signature_url,
			collectionPartyId : bankDetails?.organization_trade_party_id,
			bankDetail        : {
				bankId     : bankDetails?.id,
				bankName   : bankDetails?.data?.bank_name,
				branchCode : bankDetails?.data?.ifsc_number,
				branchName:
                    bankDetails?.data?.branch_name || bankDetails?.data?.bank_name,
				beneficiaryName   : bankDetails?.data?.account_holder_name,
				ifscCode          : bankDetails?.data?.ifsc_number,
				accountNumber     : bankDetails?.data?.bank_account_number,
				swiftCode         : bankDetails?.data.swift_number,
				collectionPartyId : bankDetails?.organization_trade_party_id,
				imageUrl          : bankDetails?.image_url,
			},
			tdsType: collectionPartyObj?.tds_deduction_type || 'NORMAL',
			tdsStyle:
                collectionPartyObj?.tds_deduction_style?.toUpperCase() || 'GROSS',
		},
		serviceProviderDetail: {
			id                   : invoiceData?.service_provider?.id,
			entityCode           : serviceProviderOrg?.entity_code,
			entityCodeId         : serviceProviderOrg?.cogo_entity_id,
			organizationId       : invoiceData?.service_provider?.id,
			organizationSerialId : invoiceData?.service_provider?.serial_id,
			organizationName:
                invoiceData?.service_provider?.business_name
                || serviceProviderOrg?.business_name,
			businessName            : invoiceData?.service_provider?.business_name,
			countryCode             : serviceProviderOrg?.country_code,
			countryId               : invoiceData?.service_provider?.country_id,
			registrationNumber      : invoiceData?.service_provider?.registration_number,
			isSez                   : collectionPartyBA?.is_sez || false,
			pincode                 : collectionPartyBA?.pincode,
			address                 : collectionPartyBA?.address,
			cityName                : serviceProviderOrg?.city?.name || '',
			countryName             : serviceProviderOrg?.country_name || '',
			taxNumber               : collectionPartyBA?.tax_number || collectionPartyBA?.gst_number,
			corporateIdentityNumber : billingPartyObj?.cin,
			tdsRate                 : serviceProviderOrg?.tds_deduction_rate,
			tdsType                 : serviceProviderOrg?.tds_deduction_type,
			tdsStyle                : serviceProviderOrg?.tds_deduction_style?.toUpperCase(),
			logoUrl                 : serviceProviderOrg?.logo_url,
			signatureUrl            : serviceProviderOrg?.signature_url,
		},
		billAdditional: {
			shipperId            : invoiceData?.service_provider.id || undefined,
			shipmentType         : shipment_data?.shipment_type || undefined,
			noOfContainers       : shipment_data?.containers_count || undefined,
			collectionPartyId    : partyId || undefined,
			urgencyTag           : formValues?.urgency_tag || undefined,
			exchangeRateDocument : uploadProof || undefined,
			isDeviationAccepted  : data?.is_deviation_accepted || undefined,
			serviceProviderType  : 'freight_forwarder',
			serialId             : shipment_data?.serial_id || undefined,
			irnNumber            : formValues?.irn_number || undefined,
			pol                  : formValues?.pol || undefined,
			pod                  : formValues?.pod || undefined,
			mawbNo               : formValues?.mawb_no || undefined,
			packageCount         : formValues?.package_count || undefined,
			weight               : formValues?.weight || undefined,
			pocName:
                collectionPartyPOC?.name
                || collectionPartyPOC?.company_name
                || undefined,
			pocEmail        : collectionPartyPOC?.email || undefined,
			pocMobileNumber : collectionPartyPOC?.mobile_number || undefined,
			containerSize   : shipment_data?.container_size || undefined,
			containerType   : shipment_data?.container_type || undefined,
			containersCount : shipment_data?.containers_count || undefined,
			rootBillId      : isTagginsAllowed ? rootid : undefined,
			refBillId:
				formValues?.invoice_type === 'credit_note' ? formValues?.ref_invoice_no : undefined,
			outstandingDocument: formValues?.outstanding_document?.finalUrl
			|| undefined,
			reasonForCN:
				formValues?.invoice_type === 'credit_note' ? formValues?.reason_for_cn : undefined,
			paymentType:
				formValues?.invoice_type === 'purchase_invoice' || formValues?.invoice_type === 'proforma_invoice'
					? formValues?.payment_type
					: undefined,
			advancedAmount: formValues?.payment_type === 'advanced' ? formValues?.advanced_amount : undefined,
			advancedAmountCurrency:
					formValues?.payment_type === 'advanced' ? formValues?.unit : undefined,
			isIncidental: formValues?.invoice_type === 'purchase_invoice'
				? formValues?.is_invoice_incedental
				: undefined,
		},
		paymentMode     : formValues?.payment_mode || 'cash',
		invoiceCurrency : formValues?.invoice_currency || ocrData?.invoice_currency,
		invoiceUrl      : uploadProof,
		lineItems       : formatLineItems(data.line_items || [], codes),
		taggedBills:
		!isEmpty(taggedProformas) && isTagginsAllowed ? FORMAT_TAGGED_IDS : undefined,
	};
	return finalData;
};

export default formatCollectionPartyPayload;
