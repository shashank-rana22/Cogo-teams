import { Placeholder } from '@cogoport/components';
import React from 'react';

import StyledTableList from './StyledTableList';
import styles from './styles.module.css';

const ARRAY_LENGTH = 8;
const ARRAY_MAP_KEY = 1;

function EmployeeList({ data = [], level, setEmployeeId, setOpenKraModal, loading }) {
	const { list = [] } = data || {};
	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				{[...Array(ARRAY_LENGTH)]
					.map((_, index) => (
						<Placeholder
							key={`${index + ARRAY_MAP_KEY}`}
							height="20px"
							width="100%"
							style={{ marginBottom: '20px' }}
						/>
					))}
			</div>
		);
	}

	return (
		<div>
			{(list || []).map((element) => {
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
