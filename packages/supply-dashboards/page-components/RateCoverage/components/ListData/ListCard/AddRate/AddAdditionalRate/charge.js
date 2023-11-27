import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
	IcMFtick,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListFreightRateFeedBacks from '../../../../../hooks/useListFreightRateFeedBacks';

import AdditionalCharges from './additionalCharges';
import styles from './styles.module.css';

function Charge({
	additionalCharge = false,
	setAdditionalCharge = () => {},
	charge = {},
	payload = {},
	additionalService = [],
	chargeAdded = [],
	setChargeAdded = () => {},
	message = {},
	containerDetails = {},
	filter = {},
	data = {},
	source = '',
	triggeredFrom = '',
}) {
	const [messageToShow, setMessageToShow] = useState('');

	const showContent = additionalCharge === charge;

	const { data: feedbackData = [], getFeedback = () => {} } =	 useListFreightRateFeedBacks({
		filter: { service: charge.split(':')[1] || '' }, payload, additionalPayload: true,
	});

	useEffect(() => {
		if (payload) setMessageToShow('');
	}, [payload]);

	const handleClick = () => {
		if (isEmpty(payload)) {
			setMessageToShow(message);
		} else {
			setAdditionalCharge((prev) => (prev === charge ? null : charge));
			getFeedback();
		}
	};

	return (
		<div className={`${styles.border_shadow}`}>
			<div
				role="button"
				tabIndex={0}
				onClick={() => {
					handleClick();
				}}
				className={`${styles.title_container}`}

			>
				{showContent === true ? (<IcMArrowRotateDown />) : (<IcMArrowRotateRight />)}
				{startCase(charge)}
				<span>{`${messageToShow}`}</span>
				{chargeAdded?.includes(`${charge}${message}`) && (<IcMFtick style={{ color: '#67C676' }} />)}
			</div>

			{showContent && (
				<AdditionalCharges
					payload={payload}
					charge={charge}
					setAdditionalCharge={setAdditionalCharge}
					setChargeAdded={setChargeAdded}
					additionalService={additionalService}
					message={message}
					containerDetails={containerDetails}
					filter={filter}
					data={data}
					source={source}
					triggeredFrom={triggeredFrom}
					feedbackData={feedbackData?.list}
				/>
			)}
		</div>
	);
}

export default Charge;
