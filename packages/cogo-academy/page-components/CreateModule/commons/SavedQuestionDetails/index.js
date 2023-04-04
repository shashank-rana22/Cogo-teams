import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';

import useGetTableColumns from './Components/TableColumns/useGetTableColumns';
import styles from './styles.module.css';

function SavedQuestionDetails({
	test_questions,
	setEditDetails,
	editDetails,
	allKeysSaved,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	loading: listLoading,
	total_count,
	setPage,
	page,
	mode,
	page_limit,
	listSetQuestions,
}) {
	const columns = useGetTableColumns({
		setAllKeysSaved,
		getTestQuestionTest,
		questionSetId,
		setEditDetails,
		allKeysSaved,
		mode,
		listSetQuestions,
	});

	if (isEmpty(test_questions)) {
		return null;
	}

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={test_questions.filter((item) => item.id !== editDetails?.id)}
				columns={columns}
				loading={listLoading}
			/>

			{total_count > page_limit ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default SavedQuestionDetails;
