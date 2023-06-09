import { Input, Pagination } from '@cogoport/components';
import { IcMCross, IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../commons/styledTable';
import useGetOrganizationList from '../../hooks/useGetOrganizationList';

import { manageBprColumn } from './Config/manageBprColumn';
import SearchCard from './SearchCard';
import styles from './styles.module.css';

function ManageBpr() {
	const [pagination, setPagination] = useState({
		page      : 1,
		pageLimit : 10,
	});
	const { bprLoading, bprData, onQueryChange, refetch, searchQuery } = useGetOrganizationList({
		pagination,
	});

	const { list = [], pageNo = 0, totalRecords = 0 } = bprData || {};

	const columns = manageBprColumn({
		refetch,
	});
	return (
		<div>
			<SearchCard refetch={refetch} />
			<div className={styles.search_box}>
				<div className={styles.input_container}>
					<Input
						prefix={(
							<IcMSearchdark
								className={styles.search_icon_style}
							/>
						)}
						suffix={(
							<IcMCross
								onClick={() => onQueryChange('')}
								style={{ cursor: 'pointer' }}
							/>
						)}
						style={{ height: '40px' }}
						onChange={(value) => {
							setPagination((prev) => ({ ...prev, page: 1 }));
							onQueryChange(value);
						}}
						value={searchQuery}
						placeholder="Search by serial id / business name "
						type="text"
					/>
				</div>
			</div>

			<StyledTable data={list} columns={columns} loading={bprLoading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={pagination.pageLimit}
					onPageChange={(val) => setPagination({ ...pagination, page: val })}
				/>

			</div>
		</div>
	);
}

export default ManageBpr;
