import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import getAdBuyerAddress from './getAdBuyerAddress';
import getAdSellerAddress from './getAdSellerAddress';
import getAdSellerBankDetails from './getAdSellerBankDetails';

const getAdvanceDocumentPayload = ({
	performedById = '',
	serial_id = '',
	formValues = {},
	billingParty = {},
	billingPartyAddress = {},
	collectionParty = {},
	cogoEntityId = '',
	collectionPartyAddress = {},
	collectionPartyBankDetails = {},
}) => {
	const {
		upload,
		currency = '',
		amount = '',
		quantity = '',
		remarks = '',
		place_of_supply = '',
		place_of_destination = '',
		due_date = null,
		payment_mode = '',
	} = formValues || {};

	const dueDate = formatDate({
		date       : due_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const documentUrls = (upload || []).reduce(
		(prev, item) => {
			if (item?.finalUrl) {
				return [
					...prev,
					item?.finalUrl,
				];
			}
			return [...prev, item];
		},
		[],
	);

	return {
		jobNumber                              : serial_id,
		type                                   : 'CONTAINER_SECURITY_DEPOSIT',
		jobSource                              : 'LOGISTICS',
		jobType                                : 'SHIPMENT',
		currency,
		zone                                   : null,
		serviceType                            : 'testing',
		exchangeRate                           : null,
		tdsAmount                              : collectionParty?.tds_deduction_rate,
		amount                                 : amount * quantity,
		refundable                             : true,
		advanceDocumentBuyerAddressRequest     : getAdBuyerAddress({ billingParty, cogoEntityId, billingPartyAddress }),
		advanceDocumentSellerAddressRequest    : getAdSellerAddress({ collectionParty, collectionPartyAddress }),
		advanceDocumentSellerBankDetailRequest : getAdSellerBankDetails({
			collectionPartyBankDetails,
			collectionParty,
		}),
		additionalData: {
			amountPerContainer         : amount,
			numberOfContainers         : quantity,
			containerSecurityDepositId : null,
			bookingProof               : null,
			quotation                  : [],
			referenceIncidentId        : null,
			description                : remarks,
			isTaxApplicable            : null,
			placeOfSupply              : place_of_supply,
			placeOfDestination         : place_of_destination,
			paymentMode                : payment_mode,
			paymentDocUrls             : documentUrls,
		},
		dueDate,
		performedBy  : performedById,
		isReconciled : false,
	};
};

export default getAdvanceDocumentPayload;
