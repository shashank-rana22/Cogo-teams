import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { DEFAULT_VALUE } from '../../../../configurations/helpers/constants';

import ServiceDetailsContent from './Content';
import styles from './styles.module.css';

function DetailsView({
	shipment_loading = false,
	request_loading = false, shipment_data = {}, requestData = {},
	source = {}, getShipment = () => {}, getRequest = () => {},
	data = {},
	filter = {},
	feedbackData = {},
	getFeedback = () => {},
	feedback_loading = false,
}) {
	const [showServiceDetails, setShowServiceDetails] = useState(false);

	const handleDetailView = () => {
		setShowServiceDetails(!showServiceDetails);
		if (!showServiceDetails) {
			if (source === 'live_booking') {
				return getShipment();
			}
			if (source === 'rate_feedback') {
				return getFeedback();
			}
			return getRequest();
		}
		return null;
	};

	return (
		<div>
			{showServiceDetails && (
				<ServiceDetailsContent
					shipment_data={shipment_data}
					requestData={requestData?.list?.[DEFAULT_VALUE] || null}
					feedbackData={feedbackData?.list?.[DEFAULT_VALUE] || null}
					shipment_loading={shipment_loading}
					request_loading={request_loading}
					feedback_loading={feedback_loading}
					filter={filter}
					data={data}
					source={source}
				/>
			)}

			<div
				className={styles.container}
				role="presentation"
				size="md"
				onClick={handleDetailView}
			>
				{showServiceDetails ? (
					<>
						Hide Details
						<IcMArrowUp style={{ margin: '-2px 2px' }} />
					</>
				) : (
					<>
						View Details
						<IcMArrowDown style={{ margin: '-2px 2px' }} />
					</>
				)}
			</div>
		</div>
	);
}

export default DetailsView;
