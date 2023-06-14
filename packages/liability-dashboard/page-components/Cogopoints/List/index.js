import { Table, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import Header from './Header';
import styles from './styles.module.css';
import TableColumns from './TableColumns';

const PAGE_COUNT = 0;
const PAGE_LIMIT = 10;
const LOADING_COUNT = 10;

function List({
	list = [],
	loading = false,
	page,
	page_limit,
	total_count,
	setPagination = () => {},
	currencyCode = '',
	activeStatsCard = '',
	setSelectOrganization = () => {},
	selectOrganization = '',
}) {
	return (
		<div className={styles.container}>
			<Header
				setSelectOrganization={setSelectOrganization}
				selectOrganization={selectOrganization}
				activeStatsCard={activeStatsCard}
				setPagination={setPagination}
			/>
			{isEmpty(list) && !loading ? (
				<figure className={styles.empty_state}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_state}
						alt="Empty State"
						width={200}
						height={250}
					/>
				</figure>
			) : (

				<Table
					className={styles.table_container}
					columns={TableColumns({ currencyCode, activeStatsCard })}
					data={list || []}
					loading={loading}
					loadingRowsCount={LOADING_COUNT}
				/>
			)}
			<Pagination
				type="table"
				className={styles.pagination_container}
				currentPage={page || PAGE_COUNT}
				totalItems={total_count || PAGE_COUNT}
				pageSize={page_limit || PAGE_LIMIT}
				onPageChange={setPagination}
			/>
		</div>
	);
}

export default List;
