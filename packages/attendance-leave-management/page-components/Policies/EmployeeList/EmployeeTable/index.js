import { Pagination } from '@cogoport/components';
// import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetLocationColumn from '../../../../common/useGetLocationColumn';

import styles from './styles.module.css';

function EmployeeTable({
	data, setFilters,
}) {
	const columns = useGetLocationColumn();
	// const {} = data;
	const { list, page, page_limit, total_count } = data || {};

	console.log('list', list);
	console.log(page_limit);
	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
		console.log(page);
	};

	return (
		<>
			<StyledTable columns={columns} data={list} />
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={onPageChange}
				/>
			</div>
			{/* {selectedIds.length !== CHECKSIZE ? (
				<div className={styles.footer}>
					<div>
						<span className={styles.footer_text}>
							{selectedIds.length === data.length
								? `All ${selectedIds.length} employee are selected.`
								: `${selectedIds.length} employees are selected on this page.`}
						</span>

					</div>
					<Button size="md" themeType="primary">Make Changes</Button>
				</div>
			)
				} */}
		</>
	);
}

export default EmployeeTable;
