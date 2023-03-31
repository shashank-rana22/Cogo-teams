import { useState } from 'react';

import useReport from '../../hooks/useReport';

import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
	const [filtersData, setFiltersData] = useState({
		entity   : '',
		category : '',
		date     : '',
		rowCheck : '',
		colCheck : '',
		chip     : '',
		radio    : '',
		mode     : '',
	});

	const [filters, setFilters] = useState({
		entity    : filtersData?.entity || '',
		category  : filtersData?.category || '',
		date      : filtersData?.date || '',
		rowCheck  : filtersData?.rowCheck || '',
		colCheck  : filtersData?.colCheck || '',
		chip      : filtersData?.chip || 'Segment',
		radio     : filtersData?.radio || '',
		mode      : filtersData?.mode || '',
		ratio     : 'VOLUME',
		monthTo   : '',
		monthFrom : '',
	});

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
