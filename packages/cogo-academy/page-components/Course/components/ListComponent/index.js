import { Pagination, Table, Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../commons/EmptyState';

import styles from './styles.module.css';
import { studentColumns, courseColumns } from './TableColumns';

const MODAL_TEXT_MAPPING = {
	courses  : 'Test',
	students : 'Question Set',
};

const columnsMapping = {
	courses  : courseColumns,
	students : studentColumns,
};

function ListComponent({
	data,
	loading,
	setParams,
	activeTab,
	params,
	fetchList,
	sortFilter,
	setSortFilter,
}) {
	const router = useRouter();

	const [testId, setTestId] = useState('');
	const [questionSetId, setQuestionSetId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const { page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	const propsMapping = {
		courses: {
			loading: false,
			router,
			setShowModal,
			setTestId,
			sortFilter,
			setSortFilter,
			fetchList,
		},
		students: {
			loading: false,
			router,
			setShowModal,
			setQuestionSetId,
			sortFilter,
			setSortFilter,
		},
	};

	const columns = columnsMapping[activeTab]({ ...propsMapping[activeTab] });

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
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>

						<Button
							type="button"
							style={{ marginLeft: '12px' }}
							// onClick={() => {
							// 	deleteFunctionMapping[activeTab]();
							// 	setShowModal(false);
							// }}
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
