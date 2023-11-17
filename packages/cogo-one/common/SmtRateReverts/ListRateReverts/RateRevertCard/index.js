import { Button } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import React from 'react';

import { getRateCardFunction } from '../../../../utils/getRateCardFunctions';

import ServiceProviderDetails from './ServiceProviderDetails';
import ShipmentDetails from './ShipmentDetails';
import ShipmentProgress from './ShipmentProgress';
import styles from './styles.module.css';

function RateRevertCard({
	cardData = {},
	mailProps = {},
	shipmentPopover = {},
	setShipmentPopover = () => {},
	assignData = {},
	setAssignData = () => {},
	setActiveTab = () => {},
	setShowAddRateModal = () => {},
	isTriggeredFromSideBar = false,
}) {
	const dispatch = useDispatch();

	const { status = '', reverted_status = '' } = cardData || {};

	const {
		handleOpenMessage,
		handleSendMail,
		handleVoiceCall,
	} = getRateCardFunction({
		mailProps,
		dispatch,
		setActiveTab,
		cardData,
		isTriggeredFromSideBar,
	});

	return (
		<div
			className={styles.container}
			style={{ width: isTriggeredFromSideBar ? '100%' : '49%' }}
		>
			<ServiceProviderDetails
				cardData={cardData}
				setShipmentPopover={setShipmentPopover}
				shipmentPopover={shipmentPopover}
				setAssignData={setAssignData}
				assignData={assignData}
				isTriggeredFromSideBar={isTriggeredFromSideBar}
			/>

			<ShipmentDetails
				cardData={cardData}
				handleOpenMessage={handleOpenMessage}
				isTriggeredFromSideBar={isTriggeredFromSideBar}
			/>

			<ShipmentProgress
				cardData={cardData}
				isTriggeredFromSideBar={isTriggeredFromSideBar}
			/>

			<div className={styles.card_footer}>
				<div className={styles.actions_container}>
					<Button
						size="md"
						themeType="secondary"
						className={styles.icon_buttons}
						onClick={handleVoiceCall}
					>
						<IcMCall className={styles.call_icon} />
					</Button>

					<Button
						size="md"
						themeType="secondary"
						className={styles.icon_buttons}
						onClick={handleSendMail}
					>
						<IcMEmail className={styles.email_icon} />
					</Button>

					<Button
						size="md"
						themeType="secondary"
						disabled={status !== 'pending' || reverted_status !== 'pending'}
						onClick={() => setShowAddRateModal({ showModal: true, cardData })}
					>
						+ Add Rate
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RateRevertCard;
