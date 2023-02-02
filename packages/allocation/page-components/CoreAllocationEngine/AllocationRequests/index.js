import { Modal, Button } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useSaveAllocationRequest from '../../../hooks/useSaveAllocationRequest';

import Form from './Form';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Requests() {
	const [showModal, setShowModal] = useState(false);

	// const showCreateUpdateModal = !isEmpty(editRequestItem);

	const onClose = () => {
		setShowModal(false);
	};

	const {
		onSave,
		loading,
		formProps,
		controls,

	} = useSaveAllocationRequest({});

	const { handleSubmit } = formProps;

	return (
		<section className={styles.container}>
			<Header onClickCreateReqBtn={() => setShowModal(true)} />

			<List />

			{showModal ? (
				<Modal
					show={showModal}
					position="basic"
					size="lg"
					onClose={onClose}
					closeOnOuterClick={false}
					className={styles.modal_container}
				>
					<Modal.Header title="Create Request" />

					<form onSubmit={handleSubmit(onSave)}>
						<Modal.Body>
							<Form
								formProps={formProps}
								controls={controls}
							/>
						</Modal.Body>

						<Modal.Footer>
							<Button
								size="md"
								type="submit"
								disabled={loading}
								id="save_request_btn"
							>
								Save
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			) : null}
		</section>
	);
}

export default Requests;
