import React from 'react';

import StyledTable from '../../../../common/StyledTable';

import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

function EmploymentStatus({ data: { job_history } = {} }) {
	const columns = useGetColumns();
	return (
		<div className={styles.info_container}>
			<span className={styles.info_heading}>EMPLOYMENT STATUS</span>
			<StyledTable columns={columns} data={job_history} className="margin_top" />
		</div>
	);
}

export default EmploymentStatus;
