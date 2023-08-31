import { Modal } from '@cogoport/components';
import { useState } from 'react';

import AddNotes from './AddNotes';
import List from './List';
import styles from './styles.module.css';

const MODES_MAPPING = {
	ocean: ['fcl_freight'],
};

function NotesModal({ modalState = {}, setModalState = () => {} }) {
	const [showForm, setShowForm] = useState(true);
	console.log('setShowForm', setShowForm);

	const { shipmentData = {} } = modalState || {};

	const { shipment_type = '' } = shipmentData || {};

	const mode = Object.keys(MODES_MAPPING).find((key) => MODES_MAPPING[key]?.includes(shipment_type));

	return (
		<Modal
			scroll={false}
			show
			onClose={() => {
				setModalState({ show: '', shipmentData: {} });
			}}
		>
			<Modal.Header title="Notes" />
			<Modal.Body className={styles.body}>
				{showForm
					? <AddNotes mode={mode} shipmentData={shipmentData} />
					: <List />}

			</Modal.Body>
		</Modal>
	);
}
export default NotesModal;
