import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import LoadingState from '../../../../common/LoadingState';
import Header from '../Header';
import Statistics from '../Statistics';

import styles from './styles.module.css';

function Enrichment(props) {
	const {
		list,
		loading,
		paginationData,
		columns,
		getNextPage,
		activeTab,
		secondaryTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;
	const { page = 1, total_count = 1, page_limit = 10 } = paginationData;

	return (
		<div>

			<Header
				filters={globalFilters}
				onChangeFilters={setGlobalFilters}
				activeTab={activeTab}
				secondaryTab={secondaryTab}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<div>

				{secondaryTab !== 'uploaded_files' && <Statistics />}

				{loading && <LoadingState /> }

				{!loading && isEmpty(list) ? (
					<div className={styles.empty_container}>
						<EmptyState
							height={280}
							width={440}
							emptyText="No records found"
							textSize="24px"
							flexDirection="column"
						/>
					</div>
				) : (
					<div className={styles.table_container}>
						<Table
							className={styles.table}
							columns={columns}
							data={list}
							loading={loading}
						/>
					</div>
				)}

			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default Enrichment;
