import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// eslint-disable-next-line max-len
import AddRateModal from '@cogoport/supply-dashboards/page-components/RateCoverage/components/ListData/ListCard/AddRateModal';
import React, { useEffect, useState } from 'react';

import useGetShipment from '../../../../hooks/useGetShipment';
import useListFreightRateFeedBacks from '../../../../hooks/useListFreightRateFeedBacks';
import useListFreightRateRequests from '../../../../hooks/useListFreightRateRequests';

const FREIGHT_NOT_NEEDED = ['trailer_freight', 'haulage_freight'];

const modifiedFilters = ({ params }) => Object.entries(params).reduce(
	(acc, [key, value]) => {
		if (key === 'service') {
			return {
				...acc,
				service: FREIGHT_NOT_NEEDED.includes(value) ? value.replace('_freight', '') : value,
			};
		}

		return {
			...acc,
			[key]: value,
		};
	},
	{},
);
function RateModal({
	showAddRateModal = {},
	params = {},
	fetchRateJobs = () => {},
	setShowAddRateModal = () => {},
}) {
	const [serviceIdPresent, setServiceIdPresent] = useState('');

	const {
		shipment_id = '',
		id = '',
		source_id: sourceId = '',
		sources = [],
		source = '',
	} = showAddRateModal?.cardData || {};

	const {
		loading: shipment_loading = false,
		data: shipment_data = {},
		getShipment = () => {},
	} = useGetShipment({
		shipmentId      : shipment_id,
		shipmentPopover : showAddRateModal?.cardData || {},
		id,
	});

	const {
		requestData = {},
		requestLoading = false,
		getFreightRateRequest = () => {},
	} = useListFreightRateRequests({ sourceId, params });

	const {
		feedbackData = {},
		feedbackLoading = false,
		getFreightRateFeedback = () => {},
	} = useListFreightRateFeedBacks({ sourceId, params });

	useEffect(
		() => {
			if (source === 'live_booking' || sources.includes('live_booking')) {
				getShipment();
				return;
			}
			if (source === 'rate_feedback' || sources.includes('rate_feedback')) {
				getFreightRateFeedback();
				return;
			}
			getFreightRateRequest();
		},
		[getFreightRateFeedback, getFreightRateRequest, getShipment, source, sources],
	);

	return (
		<AddRateModal
			showModal={showAddRateModal?.showModal}
			filter={modifiedFilters({ params })}
			source={source || sources?.[GLOBAL_CONSTANTS.zeroth_index]}
			data={showAddRateModal?.cardData}
			getListCoverage={fetchRateJobs}
			requestData={requestData}
			feedbackData={feedbackData}
			shipment_data={shipment_data || {}}
			shipment_loading={shipment_loading}
			request_loading={requestLoading}
			feedback_loading={feedbackLoading}
			serviceIdPresent={serviceIdPresent}
			setServiceIdPresent={setServiceIdPresent}
			setShowModal={() => setShowAddRateModal({
				showModal : false,
				cardData  : {},
			})}
		/>
	);
}

export default RateModal;
