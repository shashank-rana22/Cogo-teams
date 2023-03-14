import React from 'react';

import Filters from '../../commons/Filters';
import useGetPurchaseViewList from '../hooks/getLogisticsData';

import AccordianCards from './AccordianCard';
import controls from './controls';
import IncomeExpense from './IncomeExpense';
import Profitabillity from './Profitabillity';
import Statistics from './Statistics';
import TotalPayablesRecievables from './TotalPayablesRecievavles';
import TreasuryStatistics from './TreasuryStatistics';

function Logistics({ filters, setFilters }) {
	const {
		payablesTab,
		setPayablesTab,
		searchValue,
		setSearchValue,
		recievablesTab,
		setRecievablesTab,
	} = useGetPurchaseViewList();
	return (
		<div>
			<div>
				<Filters
					controls={controls}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<TotalPayablesRecievables
				payablesTab={payablesTab}
				setPayablesTab={setPayablesTab}
				recievablesTab={recievablesTab}
				setRecievablesTab={setRecievablesTab}
			/>
			<Statistics />
			<TreasuryStatistics filters={filters} setFilters={setFilters} />
			<IncomeExpense />
			<Profitabillity searchValue={searchValue} setSearchValue={setSearchValue} />
			<AccordianCards />
		</div>
	);
}

export default Logistics;
