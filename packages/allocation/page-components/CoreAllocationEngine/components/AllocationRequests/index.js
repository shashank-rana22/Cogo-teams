import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListAllocationRequests from '../../hooks/useListAllocationRequests';

import BulkUpdateConfirmation from './BulkUpdateConfirmation';
import CreateRequestModalContent from './CreateRequestModalContent';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Requests() {
	const {
		data,
		columns,
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
		requestStatusItem,
		setRequestStatusItem,
		showModal,
		onClearSelection,
		setShowModal,
		onCloseModal,
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
				onClearSelection={onClearSelection}
				isCreateDisabled={!isEmpty(checkedRowsId)}
				{...restProps}
			/>

			<List
				data={data}
				columns={columns}
				loading={listLoading}
				onChangeParams={onChangeParams}
				fetchList={refetch}
				requestStatusItem={requestStatusItem}
				setRequestStatusItem={setRequestStatusItem}
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
								onClearSelection={onClearSelection}
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
