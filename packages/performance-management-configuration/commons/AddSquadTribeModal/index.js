import { Button, Modal } from '@cogoport/components';

import getElementController from '../../configs/getElementController';

import styles from './styles.module.css';

const renderModalBody = ({ controls, control }) => (controls || []).map((controlItem) => {
	const { type, label: controlLabel, name } = controlItem || {};

	if (!type) {
		return null;
	}
	const DynamicController = getElementController(type);

	return (
		<div key={name}>
			<div className={styles.label}>
				{controlLabel}
			</div>

			<div>
				<DynamicController
					{...controlItem}
					control={control}
					name={name}
				/>
			</div>

		</div>
	);
});

function AddSquadTribeModal({ showModal, setShowModal, label = '', controls, control }) {
	const title = `Add ${label}`;

	return (
		<div>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
			>
				<Modal.Header title={title} />

				<Modal.Body>
					{renderModalBody({ controls, control })}
				</Modal.Body>

				<Modal.Footer>
					<Button themeType="primary">Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddSquadTribeModal;
