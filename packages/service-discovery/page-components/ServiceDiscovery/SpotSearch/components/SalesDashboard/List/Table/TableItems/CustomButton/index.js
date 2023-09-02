import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getPrefillForm from '../../../../../../../../SearchResults/utils/getPrefillForm';

function CustomButton({
	item = {},
	field = {},
	router = {},
	organization = {},
	createSearch = () => {},
	createSearchLoading = false,
}) {
	const { query = {} } = router;

	const isNewS2C = item?.tags?.[GLOBAL_CONSTANTS.zeroth_index]?.includes('version2');

	const shipmentsUrl = `/shipments/${item?.shipment_id}`;
	const checkoutUrl = `/checkout/${item?.checkout_id}`;

	const BUTTON_LABEL_MAPPING = {
		most_searched   : field?.btnLabel,
		most_booked     : field?.btnLabel,
		spot_search     : field?.btnLabel,
		quotations      : item?.shipment_id ? 'See Booking' : 'View Quote',
		saved_for_later : item?.shipment_id ? 'See Booking' : 'View Quote',
	};

	const onClick = (relativeUrl) => {
		if (field.inDifferentWindow) {
			const url = `/${query.partner_id}${relativeUrl}`;
			const redirectToNewS2c = isNewS2C && !item?.shipment_id;
			const finalUrl = redirectToNewS2c ? `/v2${url}` : url;

			return window.open(finalUrl, '_blank');
		}
		return router.push(relativeUrl);
	};

	const onCreateNewSearch = async () => {
		const {
			origin_location,
			destination_location,
			spot_search = {},
			primary_service,
			destination_port = {},
			origin_port = {},
			service_type = '',
			service_details: serviceDetails,
		} = item;

		const { service_details } = spot_search;

		const { user_id = '', organization_branch_id = '', organization_id = '' } = organization;

		const formValues = getPrefillForm(
			{
				...item,
				service_details : serviceDetails || service_details,
				primary_service : primary_service || service_type,
				services        : undefined,
			},
			'primary_service',
		);

		const values = {
			organization_branch_id,
			organization_id,
			service_type : primary_service || service_type,
			user_id,
			origin       : origin_location || origin_port,
			destination  : destination_location || destination_port,
			formValues,
		};

		const spot_search_id = await createSearch({ action: 'edit', values });

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	const funcMapping = {
		most_searched   : onCreateNewSearch,
		most_booked     : onCreateNewSearch,
		spot_search     : onCreateNewSearch,
		quotations      : () => onClick(item?.shipment_id ? shipmentsUrl : checkoutUrl),
		saved_for_later : () => onClick(item?.shipment_id ? shipmentsUrl : checkoutUrl),
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: 'max-content', alignItems: 'center' }}>
			<Button
				size="md"
				themeType="primary"
				onClick={funcMapping[field.key]}
				disabled={field.disabled || createSearchLoading}
			>
				<span>
					{BUTTON_LABEL_MAPPING[field.key] || 'Show Rates'}
				</span>
			</Button>

			{field.showPrice ? (
				<span style={{ fontSize: 12, fontWeight: 500 }}>
					{formatAmount({
						amount   : item?.total_price || GLOBAL_CONSTANTS.zeroth_index,
						currency : item?.total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</span>
			) : null}
		</div>
	);
}

export default CustomButton;
