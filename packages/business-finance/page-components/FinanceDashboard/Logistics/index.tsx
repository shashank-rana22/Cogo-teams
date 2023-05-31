import { IcCCountryIndia } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filters from '../../commons/Filters';

import AccordianCards from './AccordianCard';
import controls from './controls';
import IncomeExpense from './IncomeExpense';
import Profitabillity from './Profitabillity';
import Statistics from './Statistics';
import styles from './styles.module.css';
import TotalPayablesRecievables from './TotalPayablesRecievavles';
import TreasuryStatistics from './TreasuryStatistics';

interface ItemProps {
	key?: string;
	label?: string;
	icon?: JSX.Element;
}
function Logistics() {
	const [globalFilters, setGlobalFilters] = useState({});
	const [entityTabFilters, setEntityTabFilters] = useState('all');

	const entityTab = [
		{
			key   : 'all',
			label : 'ALL',
		},
		{
			key   : '101',
			label : 'Entity 101',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},
		{
			key   : '301',
			label : 'Entity 301',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},

	];

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className={styles.filter_style}>
					<Filters
						controls={controls}
						filters={globalFilters}
						setFilters={setGlobalFilters}
					/>
				</div>
				<div className={styles.flex}>
					{entityTab.map((item:ItemProps) => (
						<div
							key={item.key}
							onClick={() => {
								setEntityTabFilters(item.key);
							}}
							role="presentation"
						>
							<div className={item.key === entityTabFilters
								? styles.sub_container_click : styles.sub_container}
							>
								{item.label}
								<div>{item.icon}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<TotalPayablesRecievables globalFilters={globalFilters} entityTabFilters={entityTabFilters} />
			<Statistics globalFilters={globalFilters} entityTabFilters={entityTabFilters} />
			<IncomeExpense globalFilters={globalFilters} entityTabFilters={entityTabFilters} />
			<AccordianCards globalFilters={globalFilters} entityTabFilters={entityTabFilters} />
			<Profitabillity globalFilters={globalFilters} entityTabFilters={entityTabFilters} />
			<TreasuryStatistics />
		</div>
	);
}

export default Logistics;
