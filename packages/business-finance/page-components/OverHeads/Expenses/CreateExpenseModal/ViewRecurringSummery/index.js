import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import RecurringSummery from './RecurringSummery';
import styles from './styles.module.css';
import Summery from './Summery';

function ViewRecurringSummery({ itemData = {}, recurringState = '' }) {
	const [showModal, setShowModal] = useState(false);

	const Element = recurringState === 'recurring' ? RecurringSummery : Summery;
	return (
		<div>
			<Modal
				size="xl"
				show={showModal}
				placement="center"
				onClose={() => setShowModal(null)}
			>
				<Modal.Header title="Details" />
				<Modal.Body className={styles.modal_data}>
					<div style={{ marginTop: '20px' }}>
						<Element
							itemData={itemData}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						style={{ marginRight: '10px' }}
						onClick={() => setShowModal(null)}
						themeType="secondary"
					>
						Back
					</Button>

				</Modal.Footer>
			</Modal>
			<Button
				onClick={() => {
					setShowModal(true);
				}}
			>
				View More
			</Button>
		</div>

	);
}

export default ViewRecurringSummery;
