import { Toast } from '@cogoport/components';

const getEmailPreview = async ({
	emailContentNew = {},
	billing_addresses,
	emailContent,
	quotation_type,
	checkout_type,
	trigger,
	checkout_ids,
	checkout_id,
	shipment_id,
	setEmailPreviews,
}) => {
	const quotation_params = (billing_addresses || []).map((address) => ({
		quotation_type : 'invoicing',
		tax_number     : address?.tax_number,
		...(emailContentNew[address?.tax_number]
			|| emailContent[address?.tax_number]
			|| {}),
	}));

	console.log('emailContentNew', emailContentNew);

	const quotation_body = quotation_type === 'all_service_combined'
		? [
			{
				quotation_type: 'booking',
				...(emailContentNew?.main || emailContent?.main || {}),
			},
		]
		: [
			...quotation_params,
			{
				quotation_type: 'booking',
				...(emailContentNew?.main || emailContent?.main || {}),
			},
		];

	try {
		const res = await trigger({
			data: {
				quotation_params  : quotation_body,
				ids               : checkout_type === 'rfq' ? checkout_ids : [checkout_id],
				shipment_id       : shipment_id || undefined,
				show_preview_only : true,
			},
		});

		const FORMATTED_PREVIEWS = {};

		(res?.data?.list || []).forEach((item) => {
			if (item?.tax_number) {
				FORMATTED_PREVIEWS[item?.tax_number] = item;
			} else {
				FORMATTED_PREVIEWS.main = item;
			}
		});

		setEmailPreviews(FORMATTED_PREVIEWS);
	} catch (err) {
		if (err?.response) {
			Toast.error('Something went wrong');
		}
	}
};

export default getEmailPreview;
