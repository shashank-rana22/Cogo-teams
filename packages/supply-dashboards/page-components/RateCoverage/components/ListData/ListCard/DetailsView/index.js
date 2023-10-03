import { Popover, Button, Placeholder } from '@cogoport/components';
import React from 'react';

import ServiceDetailsContent from './Content';

const ZERO_VALUE = 0;
const LOADER_COUNT = 3;

function DetailsView({
	data = {}, shipment_loading = false,
	request_loading = false, feedback_loading = false, shipmemnt_data = {}, requestData = {}, feedbackData = {},
	source = {}, getShipment = () => {}, getFeedback = () => {}, getRequest = () => {},

}) {
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
								requestData={requestData?.list?.[ZERO_VALUE] || null}
								feedbackData={feedbackData?.list?.[ZERO_VALUE] || null}
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
