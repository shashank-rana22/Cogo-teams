import { Modal, Button } from '@cogoport/components';
import React from 'react';

export default function ConfirmSettle({
	submitSettleMatch = () => {},
	setSettleConfirmation = () => {},
	settleConfirmation = false,
	updatedData = [],
	date = '',
	fileValue = {},
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
					<div style={{
						display        : 'flex',
						alignItems     : 'center',
						justifyContent : 'center',
						fontSize       : '16px',
						fontWeight     : '500',
					}}
					>
						<p>Are you sure you want to settle?</p>
					</div>
				</Modal.Body>
				<Modal.Footer>

					<Button
						style={{ marginRight: '6px' }}
						onClick={() => { setSettleConfirmation(false); }}
						themeType="secondary"
					>
						NO
					</Button>
					<Button
						themeType="primary"
						onClick={() => {
							submitSettleMatch({ updatedData, date, fileValue, setSettleConfirmation });
						}}
					>
						YES
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
