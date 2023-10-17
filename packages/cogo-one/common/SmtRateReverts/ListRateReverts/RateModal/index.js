import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// eslint-disable-next-line max-len
import AddRateModal from '@cogoport/supply-dashboards/page-components/RateCoverage/components/ListData/ListCard/AddRateModal';
import React, { useEffect } from 'react';

import useGetShipment from '../../../../hooks/useGetShipment';
import useListFreightRateFeedBacks from '../../../../hooks/useListFreightRateFeedBacks';
import useListFreightRateRequests from '../../../../hooks/useListFreightRateRequests';

function RateModal({
	showAddRateModal = {},
	params = {},
	fetchRateJobs = () => {},
	setShowAddRateModal = () => {},
}) {
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
			filter={params}
			source={source || sources?.[GLOBAL_CONSTANTS.zeroth_index]}
			data={showAddRateModal?.cardData}
			getListCoverage={fetchRateJobs}
			requestData={requestData}
			feedbackData={feedbackData}
			shipment_data={shipment_data || {}}
			shipment_loading={shipment_loading}
			request_loading={requestLoading}
			feedback_loading={feedbackLoading}
			setShowModal={() => setShowAddRateModal({
				showModal : false,
				cardData  : {},
			})}
		/>
	);
}

export default RateModal;
