import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import StyledTable from '../../../../common/StyledTable';
import { handleSorting } from '../../../../utils/handleSorting';
import getColumns from '../../getColumns';

import styles from './styles.module.css';

function RenderStyledTable({
	level,
	setEmployeeId,
	employee_list,
	setOpenKraModal,
	setSortData,
	sortData,
}) {
	const { t } = useTranslation(['managerDashboard']);

	const columns = getColumns({
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
			emptyText={t('managerDashboard:empty_text')}
		/>
	);
}

function StyledTableList({ data, label, level, setEmployeeId, setOpenKraModal }) {
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
					<div className={styles.title}>
						<div>{startCase(label)}</div>
					</div>
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
