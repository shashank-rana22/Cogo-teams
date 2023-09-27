import { Button, Modal } from '@cogoport/components';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function UpdateRating({ show = false, onHide = () => {}, loading = false, onSubmitFinalRating = () => {} }) {
	return (
		<Modal
			show={show}
			size="sm"
			placement="center"
			onClose={onHide}
		>
			<Modal.Body>
				<div className={styles.icon_container}>
					<IcMError width="40px" height="40px" color="#C26D1A" />
				</div>
				<div className={styles.modal_text}>
					Are you sure you want to update rating?
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						themeType="secondary"
						onClick={onHide}
						style={{ marginRight: 8 }}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						themeType="accent"
						onClick={onSubmitFinalRating}
						disabled={loading}
					>
						Yes, Proceed
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateRating;
