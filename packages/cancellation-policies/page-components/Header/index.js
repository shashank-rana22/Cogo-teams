import { Modal, Button } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import useCreateShipmentCancellation from '../../hooks/useCreateShipmentCancellation';

import AddNewCancellationPolicyForm from './AddNewCancellationPolicyForm';
import Filters from './Filters';
import styles from './styles.module.css';

function Header({ filterValues = () => {}, setFilterValues = () => {}, refetch = () => {} }) {
	const [showAddNewModal, setShowAddNewModal] = useState(false);

	const formRef = useRef(null);

	const { apiTrigger = () => {} } = useCreateShipmentCancellation({
		refetch: () => {
			refetch();
			// setShow(false);
			// console.log(loading, 'loading');
			setShowAddNewModal(false);
		},
	});

	const handleSubmitForm = ({ data }) => {
		apiTrigger(data);
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				Cancellation Charge Management
			</div>

			<div className={styles.container}>
				<Button onClick={() => { setShowAddNewModal(true); }}>
					+ Add New Cancellation
				</Button>
				<div className={styles.filter_container}>
					<Filters
						filterValues={filterValues}
						setFilterValues={setFilterValues}
					/>
				</div>
			</div>

			<Modal size="xl" show={showAddNewModal} onClose={() => { setShowAddNewModal(false); }} placement="top">
				<Modal.Header title="ADD SHIPMENT CANCELLATION CHARGE" />
				<Modal.Body>
					<AddNewCancellationPolicyForm
						handleSubmitForm={handleSubmitForm}
						ref={formRef}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onSubmit}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Header;
