import { Pagination } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DATA } from '../../configurations/employeeDataMapping';
import StyledTable from '../StyledTable';

import styles from './styles.module.css';
import useEmployeeData from './useEmployeeData';

const PAGE_LIMIT = 10;
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_PAGE = 1;

function EmployeeData({ data = {}, refetchReimbursementList = false, setRefetchReimbursementList = () => {} }) {
	const { employee_details, detail } = data || {};

	const finalDetail = employee_details || detail || {};

	const {
		loading, NEW_LIST, columns, page, setPage, paginationData,
	} = useEmployeeData({
		detail: finalDetail,
		refetchReimbursementList,
		setRefetchReimbursementList,
	});

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Employee Details :</div>
			<div className={styles.item_container}>
				{EMPLOYEE_DATA.map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{val.label}
						</div>
						<div className={styles.employee_detail}>
							{(val.key === 'hrbp'
								? finalDetail?.[val.key]?.userEmail : startCase(finalDetail?.[val.key])) || '-'}
						</div>
					</div>
				))}
			</div>

			{!isEmpty(NEW_LIST || []) ? (
				<>
					<div className={styles.heading}>Previous Reimbursement Requests :</div>
					<StyledTable columns={columns} data={NEW_LIST} loading={loading} />
				</>
			) : null}

			{paginationData?.total_count > PAGE_LIMIT ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						className="md"
						totalItems={paginationData?.total_count || DEFAULT_TOTAL_ITEMS}
						currentPage={page || DEFAULT_PAGE}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default EmployeeData;
