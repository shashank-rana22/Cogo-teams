import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import Summery from './Summery';

function ViewRecurringSummery({ itemData = {} }) {
	const [showModal, setShowModal] = useState(false);
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
						<Summery
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
