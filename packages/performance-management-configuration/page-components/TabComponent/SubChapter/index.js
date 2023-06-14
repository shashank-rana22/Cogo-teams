import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import styles from './styles.module.css';
import useSubChapter from './useSubChapter';

const ADD_BUTTON_TEXT = 'Sub Chapter';
const TABLE_EMPTY_TEXT = 'No sub chapters created yet';
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 10;

function SubChapter() {
	const {
		columns, search, setSearch, data, loading,
		page, setPage,
	} = useSubChapter();

	const { list = [], ...paginationData } = data || {};

	return (
		<div>
			<Header setSearch={setSearch} search={search} label={ADD_BUTTON_TEXT} />

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

export default SubChapter;
