import React from 'react';
import Button from '@cogoport/front/components/admin/Button';
import styles from './styles.module.css';

const ConfirmationModal = ({
	label = ' ',
	triggerFunction = () => {},
	setShowModal = () => {},
	confirmation = {},
	isLoading,
}) => {
	return (
		<div>
			<div className={styles.text}>Confirm Submission of {label}</div>

			<div className={styles.description}>{confirmation?.message}</div>

			<div className={styles.button_container}>
				<Button
					className="secondary sm"
					onClick={() => setShowModal(false)}
					disabled={isLoading}
				>
					Cancel
				</Button>
				<Button
					className="primary sm"
					onClick={triggerFunction}
					disabled={isLoading}
				>
					Yes
				</Button>
			</div>
		</div>
	);
};
export default ConfirmationModal;
