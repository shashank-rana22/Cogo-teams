import { Button } from '@cogoport/components';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
// import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import { getRateCardFunction } from '../../../../../../utils/getRateCardFunctions';

import ServiceProviderDetails from './ServiceProviderDetails';
import ShipmentDetails from './ShipmentDetails';
import ShipmentProgress from './ShipmentProgress';
import styles from './styles.module.css';

function RateRevertCard({
	cardData = {}, mailProps = {}, shipmentPopover = {},
	setShipmentPopover = () => {},
	assignData = {}, setAssignData = () => {}, setActiveTab = () => {},
}) {
	const dispatch = useDispatch();

	const {
		handleOpenMessage,
		handleSendMail,
		handleVoiceCall,
	} = getRateCardFunction({
		mailProps,
		dispatch,
		setActiveTab,
		cardData,
	});

	return (
		<div className={styles.container}>
			<ServiceProviderDetails
				cardData={cardData}
				setShipmentPopover={setShipmentPopover}
				shipmentPopover={shipmentPopover}
				setAssignData={setAssignData}
				assignData={assignData}
			/>

			<ShipmentDetails
				cardData={cardData}
				handleOpenMessage={handleOpenMessage}
			/>

			<ShipmentProgress cardData={cardData} />

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

					<Button size="md" themeType="secondary">
						+ Verify And Add Rate
					</Button>
				</div>
			</div>
		</div>
	);
}

export default RateRevertCard;
