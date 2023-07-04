import { Button } from '@cogoport/components';

const renderButton = (itemData, field, router) => {
	const { query } = router;
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

	const onClick = (relativeUrl) => {
		if (field.inDifferentWindow) {
			const url = `/v2/${query.partner_id}${relativeUrl}`;
			return window.open(url, '_blank');
		}
		return router.push(relativeUrl);
	};

	return (
		<Button
			size="md"
			themeType="primary"
			onClick={() => onClick(URL_MAPPING[field.key])}
		>
			{BUTTON_LABEL_MAPPING[field.key] || 'Show Rates'}
		</Button>
	);
};

export default renderButton;
