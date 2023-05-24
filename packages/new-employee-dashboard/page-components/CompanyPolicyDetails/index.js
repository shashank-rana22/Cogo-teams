import React from 'react';

import StyledTable from '../StyledTable';

import styles from './styles.module.css';
import useCompanyPolicyDetails from './useCompanyPolicyDetails';

function CompanyPolicyDetails() {
	const { columns, loading, list } = useCompanyPolicyDetails();

	return (
		<div className={styles.container}>
			<StyledTable
				columns={columns}
				data={list}
				loading={loading}
			/>
		</div>
	);
}

export default CompanyPolicyDetails;
