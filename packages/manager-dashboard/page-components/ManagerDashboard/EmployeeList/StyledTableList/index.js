import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import StyledTable from '../../../../common/StyledTable';
import { handleSorting } from '../../../../utils/handleSorting';
import useGetColumns from '../../useGetColumns';

import styles from './styles.module.css';

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
	setSortData,
	sortData,
}) {
	const columns = useGetColumns({
		setEmployeeId,
		level,
		setOpenKraModal,
		setSortData,
		sortData,
	});

	return (
		<StyledTable
			columns={columns}
			data={employee_list}
			emptyText="No Data Found"
		/>
	);
}

function StyledTableList({ data, label, average_value, level, setEmployeeId, setOpenKraModal }) {
	const [sorting, setSorting] = useState({
		sortOrder: 'asc',
	});

	const [sortedData, setSortedData] = useState([]);

	useEffect(() => {
		if (sorting.sortBy) {
			handleSorting({ sorting, setSortedData, sortedData });
		}
	}, [sorting, sortedData]);

	useEffect(() => {
		setSortedData(data);
	}, [data]);

	return (
		<div className={styles.single_accordian}>
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
					employee_list={sortedData}
					identifier_key={label}
					level={level}
					setEmployeeId={setEmployeeId}
					setOpenKraModal={setOpenKraModal}
					sortData={sorting}
					setSortData={setSorting}
				/>
			</Accordion>
		</div>
	);
}

export default StyledTableList;
