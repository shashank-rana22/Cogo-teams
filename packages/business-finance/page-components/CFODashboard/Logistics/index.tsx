import React, { useState } from 'react';

import Filters from '../../commons/Filters';

import AccordianCards from './AccordianCard';
import controls from './controls';
import IncomeExpense from './IncomeExpense';
import Profitabillity from './Profitabillity';
import Statistics from './Statistics';
import TotalPayablesRecievables from './TotalPayablesRecievavles';
import TreasuryStatistics from './TreasuryStatistics';

function Logistics() {
	const [filters, setFilters] = useState({});

	return (
		<div>
			<div>
				<Filters
					controls={controls}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<TotalPayablesRecievables />
			<Statistics />
			<IncomeExpense />
			<AccordianCards />
			<Profitabillity
				filters={filters}
				setFilters={setFilters}
			/>
			<TreasuryStatistics />
		</div>
	);
}

export default Logistics;
