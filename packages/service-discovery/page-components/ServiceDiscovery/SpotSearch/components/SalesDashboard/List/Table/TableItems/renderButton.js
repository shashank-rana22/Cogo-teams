import { Button } from '@cogoport/components';

const renderButton = (itemData, field, router) => {
	const searchUrl = `/book/${itemData?.id}/${itemData?.importer_exporter_id}`;
	const shipmentsUrl = `/shipments/${itemData?.shipment_id}`;
	const checkoutUrl = `/checkout/${itemData?.checkout_id}`;

	const URL_MAPPING = {
		spot_search : searchUrl,
		quotations  : itemData?.shipment_id ? shipmentsUrl : checkoutUrl,
	};

	const BUTTON_LABEL_MAPPING = {
		spot_search : field?.btnLabel,
		quotations  : itemData?.shipment_id ? 'View Quote' : 'Show Rates',
	};

	return (
		<Button
			size="md"
			themeType="primary"
			onClick={() => router.push(URL_MAPPING[field.key])}
		>
			{BUTTON_LABEL_MAPPING[field.key] || 'Show Rates'}
		</Button>
	);
};

export default renderButton;
