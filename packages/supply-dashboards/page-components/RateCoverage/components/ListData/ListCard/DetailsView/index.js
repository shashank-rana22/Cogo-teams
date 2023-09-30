import { Popover, Button, Placeholder } from '@cogoport/components';
import React from 'react';

import useGetShipment from '../../../../hooks/useGetShipment';
import useListFreightRateFeedBacks from '../../../../hooks/useListFreightRateFeedBacks';
import useListFreightRateRequests from '../../../../hooks/useListFreightRateRequests';

import ServiceDetailsContent from './Content';

const ZERO_VALUE = 0;
const LOADER_COUNT = 3;

function DetailsView({ data = {}, source = '', filter = {} }) {
	const { source_id = '' } = data || {};
	const { data:shipmemnt_data, getShipment = () => {}, shipment_loading = false } = useGetShipment({ source_id });
	const { data:requestData, getRequest, loading:request_loading } = useListFreightRateRequests({ source_id, filter });
	const {
		data:feedbackData, getFeedback,
		loading: feedback_loading,
	}	= 	useListFreightRateFeedBacks({ source_id, filter });

	const handleDetailView = () => {
		if (source === 'live_bookings') {
			return getShipment();
		}
		if (source === 'rate_feedback') {
			return getFeedback();
		}
		return getRequest();
	};

	return (
		<Popover
			placement="left"
			size="md"
			render={(
				<div>
					{(shipment_loading || request_loading
					|| feedback_loading) ? [...new Array(LOADER_COUNT).keys()].map((ind) => (
						<Placeholder
							height="4vh"
							width="600px"
							key={ind}
							style={{ marginTop: '10px' }}
						/>
						))
						: (
							<ServiceDetailsContent
								shipmemnt_data={shipmemnt_data}
								data={data}
								requestData={requestData?.list[ZERO_VALUE] || null}
								feedbackData={feedbackData?.list[ZERO_VALUE] || null}
								shipment_loading={shipment_loading}
								request_loading={request_loading}
								feedback_loading={feedback_loading}
							/>
						)}
				</div>
			)}
		>
			<Button
				size="md"
				style={{ marginRight: '10px' }}
				themeType="secondary"
				onClick={handleDetailView}
			>
				View Details
			</Button>
		</Popover>
	);
}

export default DetailsView;
