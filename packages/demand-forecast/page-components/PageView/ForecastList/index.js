import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import EmptyState from '../../../common/EmptyState/EmptyState';
import ListLoading from '../../../common/EmptyState/ListLoading';
import getTableConfig from '../../../configurations/table-config';
import Card from '../Card';

import styles from './styles.module.css';

const DEFAULT_PAGE_SIZE = 0;
const DEFAULT_TOTAL_ITEM = 0;
const DEFAULT_CURRENT_PAGE = 1;

function ForecastList({
	loading = false,
	dataList = [],
	page = 1,
	setPage = () => {},
	pageData = {},
}) {
	const { t } = useTranslation(['saasSubscription']);
	const tableConfig = getTableConfig({ t });

	if (isEmpty(dataList) && !loading) {
		return (
			<div>
				<EmptyState
					height={250}
					width={400}
					flexDirection="column"
					alignItems="center"
					emptyText="Data Not Found"
					textSize="20"
					marginTop="10px"
				/>
			</div>
		);
	}

	return (
		<>
			<div className={styles.row}>
				{tableConfig.map((config) => {
					const { key, title, width } = config;
					return <div key={key} className={styles.header} style={{ width }}>{title}</div>;
				})}
			</div>
			{loading
				? <ListLoading /> : dataList?.map((card) => (
					<Card key={card?.id} card={card} />
				))}
			<div className={styles.pagination_container}>
				<Pagination
					className="md"
					totalItems={pageData?.total_count || DEFAULT_TOTAL_ITEM}
					currentPage={page || DEFAULT_CURRENT_PAGE}
					pageSize={pageData?.page_limit || DEFAULT_PAGE_SIZE}
					onPageChange={setPage}
					type="table"
				/>
			</div>

		</>

	);
}

export default ForecastList;
