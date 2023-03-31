import { useState } from 'react';

import useReport from '../../hooks/useReport';

import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
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
	const [selectFilter, setSelectFilter] = useState(false);
	const [select, setSelect] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const {
		ratiosData = {},
		reportData = {},
		reportTriggerLoading,
		fetchRatioApi,
		fetchReportApi,
		ratiosTriggerLoading,
	} = useReport({ filters });

	console.log(showReport, 'showReport');
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
			/>
			{showReport && (
				<ListProfit
					ratiosData={ratiosData}
					reportTriggerLoading={reportTriggerLoading}
					ratiosTriggerLoading={ratiosTriggerLoading}
					reportData={reportData}
					filters={filters}
				/>
			)}
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;
