import { Button, Modal } from '@cogoport/components';

import DecisionModal from './DecisionModal';

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
			closeOnOuterClick={false}
			size="lg"
		>
			<Modal.Header title={`update ${item?.log_type}`} />
			<Modal.Body
				style={{ maxHeight: '600px' }}
			>
				<DecisionModal
					item={item}
					setItem={setItem}
					setDisableNext={setDisableNext}
					type="update"
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setModal('');
						setItem({});
					}}
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
