import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function CallPriorityModal({ showCallPriority = false, setShowCallPriority = () => { } }) {
	return (
		<div className={styles.container}>
			<Modal placement="top" size="lg" show={showCallPriority} onClose={() => setShowCallPriority(false)}>
				<Modal.Body>
					<div>
						<div>
							Yash Bootwala
							Pvt Ltd
						</div>
						<div>
							Yash Bootwala
							Pvt Ltd
						</div>
						<div>
							Yash Bootwala
							Pvt Ltd
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default CallPriorityModal;
