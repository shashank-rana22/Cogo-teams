import { Button, Modal } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import useCreateUpdateFclWeightSlabs from '../../hooks/useCreateUpdateFclWeightSlabs';
import useListFclWeightSlabsConfiguration from '../../hooks/useListFclWeightSlabsConfiguration';

import Form from './AddWeightSlabs/Form';
import ListView from './common/ListView';
import columnsFunc from './Fields';
import styles from './styles.module.css';

function WeightSlabs() {
	const {
		listWeightSlabs: refetchList,
		data,
		loading,
		filters,
		setFilters,
	} = useListFclWeightSlabsConfiguration();
	const [showModal, setShowModal] = useState(false);
	const handleClick = () => {
		setShowModal({ ...showModal, isEdit: false });
	};
	const columns = columnsFunc({
		setShowModal,
		refetch: refetchList,
	});

	const formRef = useRef(null);

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const {
		apiTrigger,
		loading: apiLoading = false,
		handleCloseModal,
	} = useCreateUpdateFclWeightSlabs({
		item    : showModal,
		setItem : setShowModal,
		refetch : () => {
			refetchList();
			setShowModal(false);
		},
	});

	const handleSubmitForm = ({ data:formData = {} }) => {
		apiTrigger(formData);
	};

	let heading = 'ADD WEIGHT SLABS';
	if (showModal?.isEdit) {
		heading = 'UPDATE WEIGHT SLABS';
	}

	const formProps = {
		ref: formRef,
		handleSubmitForm,
	};

	const updateFormProps = {
		ref      : formRef,
		handleSubmitForm,
		item     : showModal,
		callBack : () => setShowModal(false),
	};

	return (
		<div className={styles.container}>
			<header className={styles.heading_container}>
				<h1 className={styles.heading}>WeightSlabs</h1>
				<div className={styles.button_container}>
					<Button
						className={styles.button}
						onClick={handleClick}
					>
						Create New Weight Slab
					</Button>
				</div>
			</header>
			<div className={styles.list_container}>
				<ListView
					data={data}
					columns={columns}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
				/>
			</div>

			{showModal ? (
				<Modal
					className={styles.modal}
					show={showModal}
					onClose={handleCloseModal}
					size="lg"
					placement="top"
				>
					<Modal.Header title={heading} />
					<Modal.Body>
						{showModal?.isEdit ? (
							<Form {...updateFormProps} />
						) : (
							<Form {...formProps} />
						)}
					</Modal.Body>

					<Modal.Footer>
						<Button
							themeType="secondary"
							style={{ marginRight: 8 }}
							disabled={apiLoading}
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>

						<Button
							onClick={onSubmit}
							disabled={apiLoading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default WeightSlabs;
