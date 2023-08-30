import { Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';
import { v4 as uuid } from 'uuid';

import useGetQueryBuilder from '../../../../../../hooks/useGetQueryBuilder';
import ListItem from '../ListItem';

import styles from './styles.module.css';

const DEFAULT_PAGE_LIMIT = 5;
function KamOrgData({
	kamOwner = '',
	filterValues = {},
	selectedBarData,
	setFilters = () => {},
	filters = {},
	barData = [],
}) {
	const { data, loading } = useGetQueryBuilder({
		kamOwner,
		filterValues,
		selectedBarData,
		outstandingPagination : filters,
		path                  : 'kam_owners',
		barGraphData          : barData,
	});

	if (loading) return <Loader />;

	const { list, page, page_limit, total_count } = data || {};

	if (!loading && isEmpty(list || [])) {
		return (
			<div>
				{/* <EmptyState /> */}
			</div>
		);
	}

	return (
		<div>
			{(list || []).map((val) => (
				<ListItem
					item={val}
					selectedBarData={selectedBarData}
					filterValues={filterValues}
					key={uuid()}
					barData={barData}
				/>
			))}
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					pageSize={page_limit || DEFAULT_PAGE_LIMIT}
					totalItems={total_count}
					currentPage={page}
					onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}

				/>
			</div>
		</div>
	);
}

export default KamOrgData;
