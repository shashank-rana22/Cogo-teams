import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import useListAllocationQuotas from '../../../hooks/useListAllocationQuotas';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function AllocationQuotas() {
	const [showModal, setShowModal] = useState(false);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const {
		data,
		loading:listLoading,
		// getNextPage,
		params,
		setParams,
		showCreateQuotas,
		setShowCreateQuotas,
		refetch,
	} = useListAllocationQuotas();

	return (
		<section className={styles.container}>
			<Header
				onClickCreateQuota={() => setShowModal(true)}
				params={params}
				setParams={setParams}
				loading={listLoading}
				toggleValue={params?.filters.role_type}
				setShowCreateQuotas={setShowCreateQuotas}
			/>

			<List
				data={data}
				loading={listLoading}
				// onChangeParams={onChangeParams}
				fetchList={refetch}
			/>

			{showCreateQuotas ? (
				<Modal
					show={showCreateQuotas}
					position="basic"
					size="lg"
					onClose={onCloseModal}
					closeOnOuterClick={false}
					className={styles.modal_container}
				>
					<Modal.Header title="Create Quota" />

					<form>
						<Modal.Body>
							{/* <Form
								formProps={formProps}
								controls={controls}
							/> */}
							n,mbnm
						</Modal.Body>

						<Modal.Footer>
							<Button
								size="md"
								type="submit"
								// loading={loadingOnSave}
								id="save_quota_btn"
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

export default AllocationQuotas;
