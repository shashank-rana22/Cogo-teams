import { Button, Modal } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal({
	setConfirmation = () => {},
	handleFinalSubmit = () => { },
}) {
	return (
		<div>
			<Modal
				size="sm"
				show
				onClose={() => {
					setConfirmation(false);
				}}
				placement="center"
				className={styles.modal_container}
			>
				<Modal.Body>
					<div className={styles.infoicon}>
						<IcMInformation height={20} width={20} color="red" />
					</div>
					<div className={styles.exchangeheading}>
						Please check all the details carefully and validate.
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.flex}>
						<Button themeType="secondary" onClick={() => setConfirmation(null)}>
							Cancel
						</Button>
						<Button
							className={styles.button}
							onClick={() => {
								handleFinalSubmit();
							}}
						>
							Proceed
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ConfirmationModal;
