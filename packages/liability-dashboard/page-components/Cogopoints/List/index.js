import { Table, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import Header from './Header';
import styles from './styles.module.css';
import getTableColumns from './TableColumns';

const PAGE_COUNT = 0;
const PAGE_LIMIT = 10;
const LOADING_COUNT = 10;

function List({
	list = [],
	loading = false,
	page,
	pageLimit,
	totalCount,
	setPagination = () => {},
	currencyCode = '',
	activeStatsCard = '',
	setSelectOrganization = () => {},
	selectOrganization = '',
	activeHeaderTab = '',
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
						src={GLOBAL_CONSTANTS.image_url.empty_image}
						alt="Empty State"
						width={200}
						height={250}
					/>
				</figure>
			) : (

				<Table
					className={styles.table_container}
					columns={getTableColumns({ currencyCode, activeStatsCard, activeHeaderTab })}
					data={list || []}
					loading={loading}
					loadingRowsCount={LOADING_COUNT}
				/>
			)}
			<Pagination
				type="table"
				className={styles.pagination_container}
				currentPage={page || PAGE_COUNT}
				totalItems={totalCount || PAGE_COUNT}
				pageSize={pageLimit || PAGE_LIMIT}
				onPageChange={setPagination}
			/>
		</div>
	);
}

export default List;
