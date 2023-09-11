import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

export default function ConfirmSettle({
	submitSettleMatch = () => {},
	setSettleConfirmation = () => {},
	settleConfirmation = false,
	updatedData = [],
	date = '',
	fileValue = {},
	settleLoading = false,
}) {
	return (
		<div>
			<Modal
				show={settleConfirmation}
				onClose={() => { setSettleConfirmation(false); }}
				onOuterClick={() => { setSettleConfirmation(false); }}
				size="md"
			>
				<Modal.Header title="SETTLEMENT CONFIRMATION" />
				<Modal.Body>
					<div
						className={styles.settleModalBody}
					>

						<p>Are you sure you want to settle?</p>

					</div>
				</Modal.Body>
				<Modal.Footer>

					<Button
						style={{ marginRight: '6px' }}
						onClick={() => setSettleConfirmation(false)}
						themeType="secondary"
						disabled={settleLoading}
					>
						NO
					</Button>
					<Button
						themeType="primary"
						onClick={() => {
							submitSettleMatch({ updatedData, date, fileValue, setSettleConfirmation });
						}}
						disabled={settleLoading}
					>
						YES
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
