export default function getCreateBookingDocumentPayload(formData) {
	const { price, currency, url, ...restFormData } = formData || {};

	const currentUrl = typeof url === 'object' ? url.finalUrl : url;

	const payload = {
		charges: {
			line_items: [
				{
					code  : 'BAS',
					name  : 'Basic freight',
					price : Number(price),
					currency,
					unit  : 'per_container',
				},
			],
		},
		document_type : 'booking_note',
		source        : 'fresh_booking_note',
		url           : currentUrl,
		...restFormData,
	};

	return payload;
}
