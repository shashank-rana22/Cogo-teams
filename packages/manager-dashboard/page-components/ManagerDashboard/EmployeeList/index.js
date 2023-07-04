import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import StyledTableList from './StyledTableList';
import styles from './styles.module.css';

const ARRAY_LENGTH = 8;

function EmployeeList({ data, level, setEmployeeId, setOpenKraModal, loading }) {
	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{[...Array(ARRAY_LENGTH)]
					.map(() => <Placeholder key={uuid()} height="20px" width="100%" margin="0px 0px 20px 0px" />)}
			</div>
		);
	}

	return (
		<div>
			{(data || []).map((element) => {
				const { details:employee_list, label, average_value } = element || {};

				return (
					<StyledTableList
						key={label}
						data={employee_list}
						label={label}
						level={level}
						average_value={average_value}
						setEmployeeId={setEmployeeId}
						setOpenKraModal={setOpenKraModal}
					/>
				);
			})}
		</div>
	);
}

export default EmployeeList;
