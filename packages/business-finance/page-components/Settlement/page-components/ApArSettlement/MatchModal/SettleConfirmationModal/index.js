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
	setJvSearch = () => {},
	t = () => {},
}) {
	return (
		<div>
			<Modal
				show={settleConfirmation}
				onClose={() => { setSettleConfirmation(false); }}
				onOuterClick={() => { setSettleConfirmation(false); }}
				size="md"
			>
				<Modal.Header title={t('settlement:settle_confirmation_title')} />
				<Modal.Body>
					<div
						className={styles.settleModalBody}
					>

						<p>{t('settlement:settle_confirm_message')}</p>

					</div>
				</Modal.Body>
				<Modal.Footer>

					<Button
						style={{ marginRight: '6px' }}
						onClick={() => setSettleConfirmation(false)}
						themeType="secondary"
						disabled={settleLoading}
					>
						{t('settlement:no_btn')}
					</Button>
					<Button
						themeType="primary"
						onClick={() => {
							submitSettleMatch({ updatedData, date, fileValue, setSettleConfirmation });
							setJvSearch('');
						}}
						disabled={settleLoading}
					>
						{t('settlement:yes_btn')}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
