import { useState, useMemo } from 'react';

import DashboardContext from '../context/DashboardContext';

import Ftl from './FTL';
import Filters from './FTL/Filters';
import StepperTabs from './FTL/StepperTabs';
import Rail from './RAIL';
import styles from './styles.module.css';

const TAB_COMPONENT_MAPPER = {
	ftl_freight           : Ftl,
	rail_domestic_freight : Rail,
};

export default function SO2Surface() {
	const [filters, setFilters] = useState({});
	const [stepperTab, setStepperTab] = useState('ftl_freight');
	const [activeTab, setActiveTab] = useState('mandatory_docs_upload');
	const [scopeFilters] = useState({});

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		stepperTab,
		setStepperTab,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters, stepperTab, setStepperTab]);

	const ActiveStepperComponent = TAB_COMPONENT_MAPPER[stepperTab];

	return (
		<DashboardContext.Provider value={contextValues}>
			<div>
				<div className={styles.header}>
					<h1>SO2 Dashboard - Surface</h1>
					<Filters />
				</div>
				<StepperTabs />
				<ActiveStepperComponent key={stepperTab} />
			</div>
		</DashboardContext.Provider>
	);
}
