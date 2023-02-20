import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListAllocationRequests from '../../../hooks/useListAllocationRequests';

import BulkUpdateConfirmation from './BulkUpdateConfirmation';
import CreateRequestModalContent from './CreateRequestModalContent';
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
		searchValue,
		setSearchValue,
		checkedRowsId,
		setCheckedRowsId,
		onChangeCheckbox,
		...restProps
	} = useListAllocationRequests();

	return (
		<section className={styles.container}>
			<Header
				onClickCreateReqBtn={() => setShowModal(true)}
				disabled={listLoading}
				onChangeParams={onChangeParams}
				params={params}
				setParams={setParams}
				setShowModal={setShowModal}
				checkedRowsId={checkedRowsId}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				{...restProps}
			/>

			<List
				data={data}
				loading={listLoading}
				onChangeParams={onChangeParams}
				fetchList={refetch}
				checkedRowsId={checkedRowsId}
				setCheckedRowsId={setCheckedRowsId}
			/>

			{showModal && (
				<Modal
					show={showModal}
					size="md"
					closeOnOuterClick={false}
					onClose={onCloseModal}
					className={styles.modal_container}
					placement="top"
				>
					{!isEmpty(checkedRowsId)
						? (
							<BulkUpdateConfirmation
								onCloseModal={onCloseModal}
								checkedRowsId={checkedRowsId}
								onResettingBulkMode={() => onChangeCheckbox({ target: { checked: false } })}
							/>
						) : (
							<CreateRequestModalContent
								refetch={refetch}
								onCloseModal={onCloseModal}
								params={params}
							/>
						)}
				</Modal>
			)}
		</section>
	);
}

export default Requests;
