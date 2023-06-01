import { IcCFcl, IcCLcl, IcCAir } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetRfqRateCardDetails from './useGetRfqRateCardDetails';
import useUpdateRfqRateMargin from './useUpdateRfqRateMargin';

const COMMODITY_MAPPING = ['cargo_weight_per_container', 'commodity',
	'container_size', 'container_type', 'containers_count'];

const ICONMAPPING = {
	fcl_freight : IcCFcl,
	lcl_freight : IcCLcl,
	air_freight : IcCAir,
};

const TEXTMAPPING = {
	fcl_freight : 'FCL',
	lcl_freight : 'LCL',
	air_freight : 'AIR',
};

const useGetPortCard = ({ props }) => {
	const { data = {}, loading, refetchRateCards, getRfqsForApproval } = props;

	const [showPrice, setShowPrice] = useState({});
	const {
		detail = {}, freight_price_currency = '', freight_price_discounted = '',
		total_price_discounted = '', id = '', stats = {},
	} = data;

	const {
		origin_port = {}, destination_port = {}, service_type,
	} = detail;

	const commodity_array = [];

	COMMODITY_MAPPING.forEach((commodity) => commodity_array.push({ [commodity]: detail[commodity] }));

	const {
		getRfqRateCardDetails, rfq_card_loading,
		rate_card_details_data,
	} = useGetRfqRateCardDetails();

	useEffect(() => {
		if (!isEmpty(showPrice)) {
			getRfqRateCardDetails({ rfq_rate_card_id: showPrice?.rfq_rate_card_id });
		}
	}, [getRfqRateCardDetails, showPrice]);

	const {
		rate = {}, detail: rate_card_details = {}, currency_conversion = {}, margin_limit = {},
	} = rate_card_details_data || {};

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[0];

	const [editedMargins, setEditedMargins] = useState({});

	const [convenienceDetails, setConvenienceDetails] = useState({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
		},
	});

	const primary_service_id = rate_card_details?.primary_service_id;
	const primaryService = {
		...(rate_card_details?.service_details?.[primary_service_id] || {}),
		rate: rate?.service_rates?.[primary_service_id] || {},
	};

	const { updateMargin } = useUpdateRfqRateMargin({
		rate,
		rate_card_details,
	});

	const Component = ICONMAPPING[service_type];

	return {
		loading,
		Component,
		origin_port,
		TEXTMAPPING,
		service_type,
		destination_port,
		commodity_array,
		stats,
		freight_price_currency,
		freight_price_discounted,
		total_price_discounted,
		showPrice,
		setShowPrice,
		id,
		rfq_card_loading,
		rate_card_details_data,
		rate,
		rate_card_details,
		currency_conversion,
		editedMargins,
		setEditedMargins,
		primaryService,
		convenienceDetails,
		setConvenienceDetails,
		updateMargin,
		refetchRateCards,
		getRfqsForApproval,
		margin_limit,
	};
};

export default useGetPortCard;
