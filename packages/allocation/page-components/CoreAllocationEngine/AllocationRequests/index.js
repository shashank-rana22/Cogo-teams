import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import Form from '../../../common/Form';
import useCreateAllocationRequest from '../../../hooks/useCreateAllocationRequest';
import useListAllocationRequests from '../../../hooks/useListAllocationRequests';

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
		setParams,
		onChangeParams,
	} = useListAllocationRequests();

	const {
		onSave,
		loading: loadingOnSave,
		formProps,
		controls,
	} = useCreateAllocationRequest({ onCloseModal, refetch });

	const { handleSubmit } = formProps;

	return (
		<section className={styles.container}>
			<Header
				onClickCreateReqBtn={() => setShowModal(true)}
				loading={listLoading}
				toggleValue={params?.filters.service_type}
				onChangeParams={onChangeParams}
				// Either setParams or onChangeParams
				params={params}
				setParams={setParams}
			/>

			<List
				data={data}
				loading={listLoading}
				onChangeParams={onChangeParams}
				fetchList={refetch}
			/>

			{showModal && (
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
			)}
		</section>
	);
}

export default Requests;
