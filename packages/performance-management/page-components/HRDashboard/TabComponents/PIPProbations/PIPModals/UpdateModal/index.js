import { Button, Modal } from '@cogoport/components';

import DecisionModal from './DecisionModal';
import styles from './styles.module.css';

function UpdateModal({
	modal,
	setModal = () => {},
	item = {},
	setItem = () => {},
	disableNext,
	onSubmit = () => {},
	setDisableNext = () => {},
}) {
	return (
		<Modal
			show={modal === 'update'}
			onClose={() => {
				setModal('');
				setItem({});
			}}
			size="lg"
		>
			<Modal.Header title={`update ${item?.log_type}`} />
			<div className={styles.upload_modal}>
				<Modal.Body>
					<DecisionModal
						item={item}
						setItem={setItem}
						setDisableNext={setDisableNext}
						type="update"
					/>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setModal('')}
				>
					Close
				</Button>

				<Button
					size="md"
					style={{ marginLeft: '8px' }}
					onClick={onSubmit}
					disabled={disableNext}
				>
					Submit
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default UpdateModal;
