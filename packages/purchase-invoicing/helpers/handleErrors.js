import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

const vietnamEntityId = GLOBAL_CONSTANTS.country_entity_ids.VN;

const handleErrors = ({
	errMszs = {},
	setErrMszs = () => {},
	formValues = {},
	billingPartyObj = {},
}) => {
	const {
		billing_party,
		billing_party_address,
		collection_party,
		collection_party_address,
		collection_party_bank_details,
		line_items,
		invoice_currency,
		tax_invoice_no,
		place_of_supply,
	} = formValues || {};

	let err_messages = errMszs;

	let isErrorExists = false;

	if (!billing_party || !billing_party_address) {
		err_messages = { ...err_messages, billingPartyErr: true };
		isErrorExists = true;
	} else {
		err_messages = { ...err_messages, billingPartyErr: false };
	}

	if (
		!collection_party
        || !collection_party_address
        || !collection_party_bank_details
	) {
		err_messages = { ...err_messages, collectionPartyErr: true };
		isErrorExists = true;
	} else {
		err_messages = { ...err_messages, collectionPartyErr: false };
	}

	let lineItemsErr = false;
	line_items?.forEach((item) => {
		const { code, currency, rate, exchange_rate, quantity, unit } = item || {};

		if (!code || !currency || !rate || !exchange_rate || !quantity || !unit) {
			lineItemsErr = true;
		}
	});

	if (lineItemsErr) {
		err_messages = { ...err_messages, line_items: true };
		isErrorExists = true;
	} else {
		err_messages = { ...err_messages, line_items: false };
	}

	if (!invoice_currency) {
		err_messages = { ...err_messages, invoice_currency: true };
		isErrorExists = true;
	} else {
		err_messages = { ...err_messages, invoice_currency: false };
	}

	if (!place_of_supply && billingPartyObj?.id !== vietnamEntityId) {
		err_messages = { ...err_messages, additional: true };
		isErrorExists = true;
	} else if (!tax_invoice_no) {
		err_messages = { ...err_messages, additional: true };
		isErrorExists = true;
	} else {
		err_messages = { ...err_messages, additional: false };
	}

	setErrMszs(err_messages);
	return isErrorExists;
};

export default handleErrors;
