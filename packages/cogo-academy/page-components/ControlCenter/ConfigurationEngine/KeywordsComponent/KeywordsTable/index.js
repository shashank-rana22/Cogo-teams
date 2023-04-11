import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmpyState';
import StyledTable from '../../../../../commons/StyledTable';

import styles from './styles.module.css';

function KeywordsTable({
	setActiveKeyword = '',
	columns = [],
	data = [],
	keywordsLoading = true,
	keywordCurrentPage,
	setKeywordCurrentPage = () => {},
}) {
	const { list:listKeywordsData = [], total_count } = data || {};

	const renderTable = () => {
		if (isEmpty(data?.list)) {
			return (
				setActiveKeyword === 'active'
					? (
						<EmptyState
							text="There are no keywords right now."
						/>
					) : (
						<EmptyState text="There are no inactive keywords right now." />
					)
			);
		}

		return (
			<div>
				<div>
					<div className={styles.table}>
						<StyledTable columns={columns} data={listKeywordsData} loading={keywordsLoading} />
					</div>

				</div>

				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={keywordCurrentPage}
						totalItems={total_count}
						pageSize={10}
						onPageChange={setKeywordCurrentPage}
					/>
				</div>

			</div>
		);
	};

	return (
		<>
			{renderTable()}
		</>
	);
}

export default KeywordsTable;
