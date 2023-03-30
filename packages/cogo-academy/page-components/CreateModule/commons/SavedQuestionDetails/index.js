import { Pagination, Button, Table, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';

import TableColumns from './Components/TableColumns';
import styles from './styles.module.css';
import useSavedQuestionDetails from './useSavedQuestionDetails';

function SavedQuestionDetails({
	test_questions,
	setEditDetails,
	editDetails,
	allKeysSaved,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	loading:listLoading,
	total_count,
	setPage,
	page,
	mode,
}) {
	const {
		handleEditQuestion,
		handleDeleteQuestion,
		loading,
		showModal,
		setShowModal,
		caseStudyLoading,
	} = useSavedQuestionDetails({
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		setEditDetails,
	});
	const columns = TableColumns({ allKeysSaved, handleEditQuestion, loading, caseStudyLoading, mode, setShowModal });

	if (isEmpty(test_questions)) {
		return (
			<EmptyState
				emptyText="No questions found, please add questions below to reflect here"
				height={180}
				textSize="20px"
			/>
		);
	}

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={test_questions.filter((item) => item.id !== editDetails?.id)}
				columns={columns}
				loading={listLoading}
			/>

			<Modal
				size="sm"
				show={!isEmpty(showModal)}
				onClose={() => setShowModal({})}
				placement="center"
				showCloseIcon={false}
			>
				<Modal.Header title="Are you sure you want to delete this?" />

				<Modal.Body>
					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							onClick={() => setShowModal({})}
						>
							Cancel
						</Button>
						<Button
							type="button"
							onClick={() => {
								handleDeleteQuestion({ item: showModal });
								setShowModal({});
							}}
						>
							Delete
						</Button>
					</div>
				</Modal.Body>
			</Modal>

			{total_count > 5 ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={5}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default SavedQuestionDetails;
