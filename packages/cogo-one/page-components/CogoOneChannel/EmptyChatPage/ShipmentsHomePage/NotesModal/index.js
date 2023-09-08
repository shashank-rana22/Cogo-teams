import { Modal, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import { getControlType } from '../../../../../constants/shipmentWiseControlsMapping';
import useGetModeSopData from '../../../../../hooks/useGetModeSopData';

import AddNotes from './AddNotes';
import List from './List';
import styles from './styles.module.css';

function Header({
	showForm = false,
	setShowForm = () => {},
}) {
	if (showForm) {
		return (
			<div className={styles.form_header}>
				<IcMArrowBack className={styles.icon_styles} onClick={() => setShowForm(false)} />
				<div className={styles.header_text}>Add Notes</div>
			</div>
		);
	}

	return (
		<div className={styles.header_styles}>
			<div className={styles.header_text}>Notes</div>
			<Button
				size="sm"
				themeType="accent"
				onClick={() => setShowForm(true)}
			>
				Add Notes

			</Button>
		</div>
	);
}

function NotesModal({ modalState = {}, setModalState = () => {} }) {
	const [showForm, setShowForm] = useState(false);

	const { shipmentData = {} } = modalState || {};

	const { shipment_type = '' } = shipmentData || {};

	const controlType = getControlType({ shipmentType: shipment_type });

	const {
		loading = false,
		notesData = [], procedureId = '',
		getModeSopData = () => {},
	} = useGetModeSopData({ shipmentData, controlType });

	return (
		<Modal
			scroll={false}
			show
			onClose={() => {
				setModalState({ show: '', shipmentData: {} });
			}}
		>
			<Modal.Header
				title={(
					<Header
						showForm={showForm}
						setShowForm={setShowForm}
					/>
				)}
				className={styles.title}
			/>
			<Modal.Body className={styles.body}>
				{showForm
					? (
						<AddNotes
							controlType={controlType}
							shipmentData={shipmentData}
							setShowForm={setShowForm}
							procedureId={procedureId}
							getModeSopData={getModeSopData}
						/>
					)
					: (
						<List
							loading={loading}
							notesData={notesData}
							controlType={controlType}
						/>
					)}
			</Modal.Body>
		</Modal>
	);
}
export default NotesModal;
