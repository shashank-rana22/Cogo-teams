import { useEffect, useState } from 'react';

import useReport from '../../hooks/useReport';

import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
	const [filtersData, setFiltersData] = useState({
		cogoEntityId : '',
		category     : '',
		date         : '',
		rowCheck     : '',
		colCheck     : '',
		chip         : '',
		radio        : '',
		mode         : '',
	});

	const [filters, setFilters] = useState({
		entity    : '',
		category  : '',
		date      : '',
		rowCheck  : '',
		colCheck  : '',
		chip      : 'Segment',
		radio     : '',
		mode      : '',
		ratio     : 'VOLUME',
		monthTo   : '',
		monthFrom : '',
	});

	useEffect(() => {
		const entityMapping = {
			'6fd98605-9d5d-479d-9fac-cf905d292b88' : 101,
			'c7e1390d-ec41-477f-964b-55423ee84700' : 201,
			'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1' : 301,
			'04bd1037-c110-4aad-8ecc-fc43e9d4069d' : 401,
			'b67d40b1-616c-4471-b77b-de52b4c9f2ff' : 501,
		};
		setFilters((prev) => ({
			...prev,
			entity   : entityMapping[filtersData?.cogoEntityId] || '',
			category : filtersData?.category || '',
			date     : filtersData?.date || '',
			rowCheck : filtersData?.rowCheck || '',
			colCheck : filtersData?.colCheck || '',
			chip     : filtersData?.chip || 'Segment',
			radio    : filtersData?.radio || '',
			mode     : filtersData?.mode || '',
		}));
	}, [filtersData]);

	const [selectFilter, setSelectFilter] = useState(false);
	const [select, setSelect] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const {
		ratiosData = {},
		reportData = {},
		// reportTriggerLoading,
		fetchRatioApi,
		fetchReportApi,
		// ratiosTriggerLoading,
	} = useReport({ filters });

	return (
		<div>
			<Card
				filters={filters}
				fetchRatioApi={fetchRatioApi}
				fetchReportApi={fetchReportApi}
				setFilters={setFilters}
				selectFilter={selectFilter}
				setSelectFilter={setSelectFilter}
				select={select}
				setSelect={setSelect}
				setShowReport={setShowReport}
				setFiltersData={setFiltersData}
			/>
			{showReport && (
				<ListProfit
					ratiosData={ratiosData}
					// reportTriggerLoading={reportTriggerLoading}
					// ratiosTriggerLoading={ratiosTriggerLoading}
					reportData={reportData}
					filters={filters}
				/>
			)}
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;
