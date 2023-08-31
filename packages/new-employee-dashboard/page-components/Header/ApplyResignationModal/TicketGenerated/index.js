import { Button } from '@cogoport/components';
import React from 'react';

import AnimatedTick from '../../../../common/AnimatedTick';

import styles from './styles.module.css';

function TicketGenerated({ setShowModal = () => {} }) {
	return (
		<div className={styles.container}>
			<AnimatedTick />

			<div className={styles.ticket_generated}>Ticket Generated !</div>

			<div className={styles.sub_text}>
				Your Resignation request has been registered. Your Request ID is
				{' '}
				<span className={styles.request_id}>SEP202308310012</span>
			</div>

			<Button style={{ marginLeft: 8 }} onClick={() => setShowModal(false)}>Done</Button>
		</div>
	);
}

export default TicketGenerated;
