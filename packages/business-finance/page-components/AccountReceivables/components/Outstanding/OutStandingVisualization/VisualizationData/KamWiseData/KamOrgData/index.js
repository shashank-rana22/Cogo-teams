import { Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetQueryBuilder from '../../../../../../hooks/useGetQueryBuilder';
import EmptyStateOutStanding from '../../../../EmptyStateOutStanding';
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
	entityCode = '',
}) {
	const { data, loading } = useGetQueryBuilder({
		kamOwner,
		filterValues,
		selectedBarData,
		outstandingPagination : filters,
		path                  : 'kam_owners',
		barGraphData          : barData,
		entityCode,
	});

	if (loading) {
		return (
			<div className={styles.loader}><Loader themeType="primary" style={{ height: 30, width: 30 }} /></div>
		);
	}

	const { list, page, page_limit, total_count } = data || {};

	if (!loading && isEmpty(list || [])) {
		return (

			<EmptyStateOutStanding width={400} height={200} />
		);
	}

	return (
		<div>
			{(list || []).map((val) => (
				<ListItem
					item={val}
					selectedBarData={selectedBarData}
					filterValues={filterValues}
					key={val?.credit_controller_id}
					barData={barData}
					entityCode={entityCode}
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
