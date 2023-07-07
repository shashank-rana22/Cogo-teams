import { Button, Modal, Input, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function ScoreModal({ show = false, setShow = () => {} }) {
	const onClose = () => {
		setShow(false);
	};

	return (
		<div style={{ padding: '20px' }}>

			<Modal size="md" show={show} onClose={() => setShow(false)} placement="center">
				<Modal.Body>
					<div className={styles.parent}>
						<div className={styles.header}>Score on Strength With Shipping Lines</div>
						<div className={styles.maximum_score}>
							Maximum Score :&nbsp;
							<span style={{ color: '#221F20' }}>25</span>
						</div>
						<div className={styles.input_score}>
							Your Score
							<Input size="sm" style={{ width: '132px', height: '32 px' }} placeholder="Score" />
						</div>
						<div className={styles.reason_main}>
							Reason
							<Textarea className={styles.reason} name="a4" size="md" defaultValue="" placeholder="" />

						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ScoreModal;
