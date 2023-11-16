import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useGetEmployeeTempColumns from '../../../../common/useGetEmployeeTempColumns';

import styles from './styles.module.css';

function EmployeeTable({ data = [], loading = false, getListGeoLocationReq = () => {} }) {
	const columns = useGetEmployeeTempColumns({
		data,
		getListGeoLocationReq,
	});

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={data} loading={loading} className="table_height" />
		</div>
	);
}

export default EmployeeTable;
