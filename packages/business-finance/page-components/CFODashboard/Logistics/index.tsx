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
	const [globalFilters, setGlobalFilters] = useState({});

	return (
		<div>
			<div>
				<Filters
					controls={controls}
					filters={globalFilters}
					setFilters={setGlobalFilters}
				/>
			</div>
			<TotalPayablesRecievables globalFilters={globalFilters} />
			<Statistics globalFilters={globalFilters} />
			<IncomeExpense globalFilters={globalFilters} />
			<AccordianCards globalFilters={globalFilters} />
			<Profitabillity globalFilters={globalFilters} />
			<TreasuryStatistics />
		</div>
	);
}

export default Logistics;
