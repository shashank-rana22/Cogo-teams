import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useEffect, useState } from 'react';

import useReport from '../../hooks/useReport';

import Card from './Card';
import ListProfit from './ListProfit';
import styles from './styles.module.css';

function PLStatement() {
	const [filtersData, setFiltersData] = useState({
		cogoEntityId : '',
		category     : '',
		month        : '',
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
		setFilters((prev) => ({
			...prev,
			entity   : getEntityCode(filtersData?.cogoEntityId) || '',
			category : filtersData?.category || '',
			date     : filtersData?.month || '',
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
		fetchRatioApi,
		fetchReportApi,
		reportTriggerLoading,
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
				reportTriggerLoading={reportTriggerLoading}
			/>
			{showReport && (
				<ListProfit
					ratiosData={ratiosData}
					reportData={reportData}
					filters={filters}
				/>
			)}
			<div className={styles.amount}>All amounts are in INR*</div>
		</div>
	);
}
export default PLStatement;