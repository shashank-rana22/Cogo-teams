import { Button, Modal } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import REMINDER_TIPS from '../../../constants/REMINDER_TIPS';
import useShipmentReminder from '../../../hooks/useShipmentReminder';
import getShipmentReminderStats from '../../../utils/getShipmentReminderStats';

import FillContainer from './FillContainer';
import PercentageDiv from './PercentageDiv';
import styles from './styles.module.css';

function ReminderModal({ firestore, agentId, getAssignedChats }) {
	const [reminderModal, setReminderModal] = useState(false);

	const { mountReminderSnapShot, cleanUpTimeout, shipmentData } = useShipmentReminder(
		{ setReminderModal, firestore, agentId, getAssignedChats },
	);

	useEffect(() => {
		let addSnapShotAfterfewSeconds = '';
		clearTimeout(addSnapShotAfterfewSeconds);
		addSnapShotAfterfewSeconds = setTimeout(
			mountReminderSnapShot,
			100,
		);
		return () => {
			cleanUpTimeout();
			clearTimeout(addSnapShotAfterfewSeconds);
		};
	}, [cleanUpTimeout, mountReminderSnapShot]);

	const statsMapping = getShipmentReminderStats(shipmentData);

	return (
		<Modal
			size="md"
			show={reminderModal}
			className={styles.modal_styled}
			onClickOutside={() => setReminderModal(false)}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header title="Your Summary" />
			<Modal.Body>
				<div className={styles.header}>
					No. of Chats Assigned
					<span>{shipmentData.assignedChatsCount || 0}</span>
				</div>
				<div className={styles.header}>
					Shipments Booked
				</div>
				<div className={styles.stats_row}>
					<FillContainer label="Today" value={shipmentData?.dayCount} />
					{statsMapping.map((eachStat) => <PercentageDiv key={eachStat?.key} eachStat={eachStat} />)}
				</div>
				<div className={styles.header}>
					Tips
				</div>
				<ol>
					{REMINDER_TIPS.map((tip) => <li key={tip} className={styles.li_styled}>{tip}</li>)}
				</ol>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_styles}>
					<Button size="sm" themeType="primary" onClick={() => setReminderModal(false)}>
						OK
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ReminderModal;
