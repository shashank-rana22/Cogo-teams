import { Pagination, Table, Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../commons/EmptyState';

import styles from './styles.module.css';
import useHandleListComponent from './useHandleListComponent';

function ListComponent({
	data,
	loading,
	setParams,
	activeTab,
	params,
	fetchList,
}) {
	const {
		columns,
		showModal,
		setShowModal,
		MODAL_TEXT_MAPPING,
		deleteApiParams,
		deleteLoading,
		deleteApi,
	} = useHandleListComponent({
		activeTab,
		fetchList,
		setParams,
		params,
	});

	const { page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	if (!loading && isEmpty(data?.list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={list || []}
				columns={columns}
				loading={loading}
			/>

			<Modal
				size="sm"
				show={showModal}
				onClose={() => setShowModal(false)}
				placement="center"
				showCloseIcon={false}
			>
				<Modal.Header title={`Are you sure you want to delete this ${MODAL_TEXT_MAPPING[activeTab]}?`} />

				<Modal.Body>
					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							disabled={deleteLoading}
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>

						<Button
							type="button"
							style={{ marginLeft: '12px' }}
							loading={deleteLoading}
							onClick={() => {
								deleteApi({ values: deleteApiParams });
							}}
						>
							Delete
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			{total_count > pageLimit ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={params?.page}
						totalItems={total_count}
						pageSize={pageLimit}
						onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
					/>
				</div>
			) : null}
		</div>
	);
}

export default ListComponent;
