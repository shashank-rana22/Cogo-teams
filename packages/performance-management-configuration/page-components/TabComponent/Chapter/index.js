import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';
import useChapter from './useChapter';

const ADD_BUTTON_LABEL = 'Chapter';
const TABLE_EMPTY_TEXT = 'No Chapters created yet';
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 10;

function Chapter() {
	const {
		columns, search, setSearch, data, loading,
		page, setPage,
	} = useChapter();

	const { list = [], ...paginationData } = data || {};

	return (
		<div>
			<Header setSearch={setSearch} search={search} label={ADD_BUTTON_LABEL} />

			<StyledTable columns={columns} data={list} emptyText={TABLE_EMPTY_TEXT} loading={loading} />

			{paginationData?.total_count > DEFAULT_TOTAL_COUNT && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={paginationData?.total_count || DEFAULT_TOTAL_ITEMS}
						currentPage={page || DEFAULT_CURRENT_PAGE}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}
		</div>
	);
}

export default Chapter;
