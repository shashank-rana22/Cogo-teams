import { Button, Modal } from '@cogoport/components';

import handleEnterFullScreen from '../../../../utils/handleEnterFullScreen';

import styles from './styles.module.css';

const items = ['Exam can be only taken in full screen',
	'To continue test, please click on continue',
	`Changing tabs is not allowed in between exam,
	If you switch tabs more than 2 times, your exam will be submitted automatically`];

function WarningModal({ loading }) {
	return (
		<Modal showCloseIcon={false} size="md" show className={styles.modal_container}>
			<Modal.Header title="WARNING" />

			<Modal.Body>
				<ul className={styles.list}>
					{items.map((item, index) => (
						<li key={item} className={`${styles.list} ${styles[`list_${index}`]}`}>
							{item}
						</li>
					))}
				</ul>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					onClick={handleEnterFullScreen}
					loading={loading}
				>
					Continue
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default WarningModal;
