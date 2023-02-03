import { Modal, Button } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListAllocationRequests from '../../../hooks/useListAllocationRequests';
import useSaveAllocationRequest from '../../../hooks/useSaveAllocationRequest';

import Form from './Form';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Requests() {
	const [showModal, setShowModal] = useState(false);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const {
		data,
		loading: listLoading,
		refetch,
		params,
		onChangeParams,
	} = useListAllocationRequests();

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
		controls,
	} = useSaveAllocationRequest({ onCloseModal, refetch });

	const { handleSubmit } = formProps;

	return (
		<section className={styles.container}>
			<Header
				onClickCreateReqBtn={() => setShowModal(true)}
				loading={listLoading}
				toggleValue={params?.filters.service_type}
				onChangeParams={onChangeParams}
			/>

			<List
				data={data}
				loading={listLoading}
				onChangeParams={onChangeParams}
			/>

			{showModal ? (
				<Modal
					show={showModal}
					position="basic"
					size="lg"
					onClose={onCloseModal}
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
								loading={loadingOnSave}
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
