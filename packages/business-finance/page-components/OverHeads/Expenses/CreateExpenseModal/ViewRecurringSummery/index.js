import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import RecurringSummery from './RecurringSummery';
import styles from './styles.module.css';
import Summery from './Summery';

function ViewRecurringSummery({ itemData = {}, recurringState = '' }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			{showModal ? (
				<Modal
					size="xl"
					show={showModal}
					placement="center"
					onClose={() => setShowModal(null)}
				>
					<Modal.Header title="Details" />
					<Modal.Body className={styles.modal_data}>
						<div style={{ marginTop: '20px' }}>
							{recurringState === 'recurring' ? (
								<RecurringSummery
									itemData={itemData}
								/>
							) : (
								<Summery
									itemData={itemData}
								/>
							)}
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
			) : null}
			<Button
				onClick={() => {
					setShowModal(true);
				}}
			>
				Details
			</Button>
		</div>

	);
}

export default ViewRecurringSummery;
