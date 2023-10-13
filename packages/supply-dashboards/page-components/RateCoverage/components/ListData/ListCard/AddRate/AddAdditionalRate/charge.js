import {
	IcMArrowRotateRight,
	IcMArrowRotateDown,
	IcMFtick,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import AdditionalCharges from './additionalCharges';
import styles from './styles.module.css';

function Charge({
	additionalCharge,
	setAdditionalCharge,
	charge,
	payload,
	additionalService,
	chargeAdded,
	setChargeAdded,
	message,
	containerDetails,
}) {
	const [messageToShow, setMessageToShow] = useState('');
	const showContent = additionalCharge === `${charge}${message}`;

	useEffect(() => {
		if (payload) setMessageToShow('');
	}, [payload]);

	const handleClick = () => {
		if (showContent) {
			setAdditionalCharge(null);
		} else if (
			[
				'export:air_freight_local',
				'import:air_freight_local',
				'export:fcl_freight_local',
				'import:fcl_freight_local',
				'add_surcharge',
			].includes(charge)
			&& !payload
		) {
			setMessageToShow(message);
		} else {
			setAdditionalCharge(`${charge}${message}`);
		}
	};

	return (
		<div className={`${styles.border_shadow} ${showContent ? styles.open : ''}`}>
			<div
				role="button"
				tabIndex={0}
				onClick={() => {
					handleClick();
				}}
				className={`${styles.title_container}`}
			>
				{additionalCharge === charge ? (
					<IcMArrowRotateDown />
				) : (
					<IcMArrowRotateRight />
				)}
				{startCase(charge)}
				<span>{`${messageToShow}`}</span>
				{chargeAdded.includes(`${charge}${message}`) && (
					<IcMFtick style={{ color: '#67C676' }} />
				)}
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
				/>
			)}
		</div>
	);
}

export default Charge;
