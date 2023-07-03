import { Accordion, Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';
import { v4 as uuid } from 'uuid';

import StyledTable from '../../../common/StyledTable';
import useGetColumns from '../useGetColumns';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

const ARRAY_LENGTH = 8;

function RenderTitle({ title, averageValue, level }) {
	return (
		<div className={styles.title}>
			<div>{startCase(title)}</div>

			{level === 'vertical_manager' && (
				<div className={styles.average_value}>
					Average Rating :
					{' '}
					{averageValue || '-'}
				</div>
			)}

		</div>
	);
}

function RenderStyledTable({
	level,
	setEmployeeId,
	employee_list,
	setOpenKraModal,
}) {
	const columns = useGetColumns({
		setEmployeeId,
		level,
		setOpenKraModal,
	});

	return (
		<StyledTable
			columns={columns}
			data={employee_list}
			emptyText={TABLE_EMPTY_TEXT}
		/>
	);
}

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
					<div key={label} className={styles.single_accordian}>
						<Accordion
							type="text"
							isOpen={label === 'all_employees'}
							title={(
								<RenderTitle
									title={label}
									averageValue={average_value}
									level={level}
								/>
							)}
						>
							<RenderStyledTable
								employee_list={employee_list}
								identifier_key={label}
								level={level}
								setEmployeeId={setEmployeeId}
								setOpenKraModal={setOpenKraModal}
							/>
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default EmployeeList;
