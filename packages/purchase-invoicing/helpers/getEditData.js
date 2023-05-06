import { BILL_MAPPINGS } from '../constants';

const getEditData = (editData) => {
	const codes = {};

	(editData?.line_items || []).forEach((item) => {
		codes[item.code] = {
			...item,
		};
	});

	return {
		invoice_type          : editData?.invoice_type,
		billing_party         : editData?.billing_party_detail?.registration_number,
		billing_party_address : editData?.billing_party_detail?.address?.gst_number,
		collection_party      : editData?.registration_number,
		collection_party_bank_details:
            editData?.bank_details?.[0]?.bank_account_number,
		collection_party_address : editData?.address,
		...(editData?.shipment_detail || {}),
		...editData,
		line_items               : editData?.line_items || [],
		invoice_currency         : editData?.invoice_currency,
		exchange_rate            : editData?.exchange_rates,
		codes,
		id                       : editData?.finance_job_number,
		billType                 : BILL_MAPPINGS[editData?.invoice_type],
	};
};

export default getEditData;
