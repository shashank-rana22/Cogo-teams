import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DATA } from '../../configurations/employeeDataMapping';
import StyledTable from '../StyledTable';

import styles from './styles.module.css';
import useEmployeeData from './useEmployeeData';

function EmployeeData({ data = {}, refetchReimbursementList = false, setRefetchReimbursementList = () => {} }) {
	const { employee_details: detail } = data || {};

	const { loading, NEW_LIST, columns } = useEmployeeData({
		detail,
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
								? detail?.[val.key]?.userEmail : startCase(detail?.[val.key])) || '-'}
						</div>
					</div>
				))}
			</div>

			<div className={styles.heading}>Previous Reimbursement Requests : </div>
			<StyledTable columns={columns} data={NEW_LIST} loading={loading} />
		</div>
	);
}

export default EmployeeData;
