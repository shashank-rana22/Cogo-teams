import { Button, Input, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ExtendExpiryModel({ show, setShow }) {
	const onClose = () => {
		setShow(false);
	};
	return (
		<Modal size="sm" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Extend Expiry" />
			<Modal.Body>
				<div className={styles.parent}>
					<div className={styles.label}>
						You have chosen to extend the expiry of
						{' '}
						<span className={styles.value}>5 rates. </span>
					</div>
					<div className={styles.date}>
						<div className={styles.date_title}>
							Select a date
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>

							<Input type="date" className={styles.date_input} />

							<div className={styles.date_label}>
								Extend by &nbsp;
								{' '}
								<b>7 days </b>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="tertiary" onClick={onClose} style={{ marginRight: '10px' }}>Cancel</Button>
				<Button themeType="primary" onClick={onClose}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ExtendExpiryModel;
