import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getPrefillForm from '../../../../../../../../SearchResults/utils/getPrefillForm';

function CustomButton({
	item = {},
	field = {},
}) {
	const { props = {} } = field;

	const {
		router = {},
		createSearch = () => {},
		createSearchLoading = false,
		organization = {},
	} = props || {};

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

	const onCreateNewSearch = async ({ defaultSearch = false }) => {
		const {
			origin_location = {},
			destination_location = {},
			primary_service = '',
			destination_port = {},
			origin_port = {},
			service_type = '',
			service_details = {},
		} = item;

		const { user_id = '', organization_branch_id = '', organization_id = '' } = organization;

		const formValues = getPrefillForm(
			{
				...item,
				service_details,
				service_type,
				services: undefined,
			},
			'service_type',
		);

		const values = {
			organization_branch_id,
			organization_id,
			service_type,
			user_id,
			origin      : origin_port,
			destination : destination_port,
			formValues,
		};

		const spot_search_id = await createSearch({
			action : defaultSearch ? 'default' : 'edit',
			values : defaultSearch
				? {
					...organization,
					service_type : primary_service,
					destination  : destination_location,
					origin       : origin_location,
				}
				: values,
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	const funcMapping = {
		most_searched   : () => onCreateNewSearch({ defaultSearch: true }),
		most_booked     : () => onCreateNewSearch({ defaultSearch: true }),
		spot_search     : () => onCreateNewSearch({ defaultSearch: false }),
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
		</div>
	);
}

export default CustomButton;
