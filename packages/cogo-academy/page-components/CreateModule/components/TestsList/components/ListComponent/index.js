import { Pagination, Table, Modal, Button } from '@cogoport/components';
import { IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateQuestionSet from '../../../../hooks/useCreateQuestionSet';
import useUpdateTest from '../../../../hooks/useUpdateTest';
import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';
import { questionSetColumns, testSetColumns } from './TableColumns';

const MODAL_TEXT_MAPPING = {
	tests        : 'Test',
	question_set : 'Question Set',
};

function ListComponent({ data, loading, setParams, activeTab, params, fetchList }) {
	const router = useRouter();

	const [sort, setSort] = useState(false);
	const [testId, setTestId] = useState('');
	const [questionSetId, setQuestionSetId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const { page_limit: pageLimit = 0, total_count = 0, list } = data || {};

	const columnsMapping = {
		tests        : testSetColumns,
		question_set : questionSetColumns,
	};

	const {
		loading: updateLoading,
		createQuestionSet,
	} = useCreateQuestionSet({ questionSetId, getTestQuestionTest: fetchList });

	const { loading: updateTestLoading, updateTest } = useUpdateTest();

	const propsMapping = {
		tests: {
			loading: updateTestLoading,
			router,
			setShowModal,
			setTestId,
		},
		question_set: { loading: updateLoading, router, setShowModal, setQuestionSetId },
	};

	const columns = columnsMapping[activeTab]({ ...propsMapping[activeTab] });

	const handleDeleteTest = () => {
		updateTest({ test_id: testId, fetchList, type: 'delete', from: 'test' });
	};

	const handleDeleteQuestionSet = () => {
		createQuestionSet({ type: 'delete', from: 'test' });
	};

	const deleteFunctionMapping = {
		tests        : handleDeleteTest,
		question_set : handleDeleteQuestionSet,
	};

	if (!loading && isEmpty(data?.list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.table_container}>
			<div
				role="presentation"
				onClick={() => {
					setSort((prev) => !prev);

					setParams((prev) => ({
						...prev,
						sort_type : sort ? 'asc' : 'desc',
						filters   : {
							...prev.filters,

						},
					}));
				}}
				className={styles.sort}
			>
				{sort ? (
					<IcMArrowRotateUp
						className={`${styles.styled_icon} ${styles.rotate}`}
					/>
				) : (
					<IcMArrowRotateUp
						className={styles.styled_icon}
					/>
				)}
				<span
					className={styles.span_text}
				>
					Sort By
				</span>
			</div>

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
							onClick={() => {
								deleteFunctionMapping[activeTab]();
								setShowModal(false);
							}}
						>
							Delete
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			{total_count > 10 ? (
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
