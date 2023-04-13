import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import DecisionModal from './DecisionModal';

function UpdateModal({
	modal,
	setModal = () => {},
	item = {},
	setItem = () => {},
	onSubmit = () => {},
}) {
	const [disableNext, setDisableNext] = useState(true);

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
			<Modal.Body style={{ maxHeight: '500px' }}>
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
