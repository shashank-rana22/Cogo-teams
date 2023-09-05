import React from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';

import styles from './styles.module.css';

function ReviewRequest() {
	return (
		<div>
			<div className={styles.title}>REVIEW REQUEST</div>
			<div className={styles.sub_heading}>Separation request summary</div>

			<EmployeeDetail />
		</div>
	);
}

export default ReviewRequest;
