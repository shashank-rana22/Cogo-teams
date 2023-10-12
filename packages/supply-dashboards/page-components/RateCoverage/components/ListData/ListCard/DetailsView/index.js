import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { DEFAULT_VALUE } from '../../../../configurations/helpers/constants';

import ServiceDetailsContent from './Content';
import styles from './styles.module.css';

function DetailsView({
	data = {}, shipment_loading = false,
	request_loading = false, feedback_loading = false, shipmemnt_data = {}, requestData = {}, feedbackData = {},
	source = {}, getShipment = () => {}, getFeedback = () => {}, getRequest = () => {},

}) {
	const [showServiceDetails, setShowServiceDetails] = useState(false);
	const handleDetailView = () => {
		setShowServiceDetails(!showServiceDetails);
		if (source === 'live_booking') {
			return getShipment();
		}
		if (source === 'rate_feedback') {
			return getFeedback();
		}
		return getRequest();
	};

	return (
		<div>
			{showServiceDetails && (
				<ServiceDetailsContent
					shipmemnt_data={shipmemnt_data}
					data={data}
					requestData={requestData?.list?.[DEFAULT_VALUE] || null}
					feedbackData={feedbackData?.list?.[DEFAULT_VALUE] || null}
					shipment_loading={shipment_loading}
					request_loading={request_loading}
					feedback_loading={feedback_loading}
				/>
			)}

			<div
				className={styles.container}
				role="presentation"
				size="md"
				onClick={handleDetailView}
			>
				{showServiceDetails ? 'Hide Details' : 'View Details'}
				{showServiceDetails ? <IcMArrowUp style={{ margin: '-2px 2px' }} />
					: <IcMArrowDown style={{ margin: '-2px 2px' }} />}
			</div>
		</div>
	);
}

export default DetailsView;
