import { Pagination } from '@cogoport/components';
import { useState } from 'react';

// import EmptyState from '../../../common/EmptyState/EmptyState';
import getDataConfig from '../../../configurations/data-config';
import getTableConfig from '../../../configurations/table-config';
import Card from '../Card';

import styles from './styles.module.css';

const DEFAULT_PAGE_SIZE = 0;
const DEFAULT_TOTAL_ITEM = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE = 1;

function ForecastList() {
	const tableConfig = getTableConfig();
	const [page, setPage] = useState(DEFAULT_PAGE);
	// if (dataList) {
	// 	return (
	// 		<div>
	// 			<EmptyState
	// 				height="250"
	// 				width="400"
	// 				flexDirection="column"
	// 				alignItems="center"
	// 				emptyText="Data Not Found"
	// 				textSize="20"
	// 				marginTop="100px"
	// 			/>
	// 		</div>
	// 	);
	// }

	const dataList = getDataConfig();
	return (
		<>
			<div className={styles.row}>
				{tableConfig.map((config) => {
					const { key, title, width } = config;
					return <div key={key} style={{ width, textAlign: 'center' }}>{title}</div>;
				})}
			</div>
			{
				dataList.map((card) => (
					<Card key={card?.id} card={card} />
				))
			}
			<div className={styles.pagination_container}>
				<Pagination
					className="md"
					totalItems={dataList?.total_count || DEFAULT_TOTAL_ITEM}
					currentPage={page || DEFAULT_CURRENT_PAGE}
					pageSize={dataList?.page_limit || DEFAULT_PAGE_SIZE}
					onPageChange={setPage}
					type="table"
				/>
			</div>

		</>

	);
}

export default ForecastList;
