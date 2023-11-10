import { Modal, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';

import styles from './styles.module.css';

function WarningModal({
	show = '', // suggestion,warning
	setShow = () => {},
	handleSubmit = () => {},
	handleApply = () => {},
}) {
	const onClose = () => {
		setShow('');
	};

	const onProceed = () => {
		setShow('proceed');
		handleSubmit(handleApply)();
	};

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement="top"
			animate
		>
			<Modal.Header title={(
				<div className={styles.header}>
					<IcMAlert className={styles.header_icon} />
					<span className={styles.header_text}>Warning!</span>
				</div>
			)}
			/>

			<Modal.Body>
				<p>
					If any unit is over-weight or over-dimensional, it is recommended to
					use &#8220;By Packing Type&#8221; option to calculate your shipment
					details
				</p>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					className={styles.first_button}
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					type="button"
					size="md"
					themeType="primary"
					onClick={onProceed}
				>
					Proceed Anyway
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WarningModal;
