import { useState, useMemo } from 'react';

import DashboardContext from '../context/DashboardContext';

import FTL from './FTL';
import Filters from './FTL/Filters';
import StepperTabs from './FTL/StepperTabs';
import RAIL from './RAIL';
import styles from './styles.module.css';

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

	const getTabComponent = () => {
		switch (stepperTab) {
			case 'ftl_freight': return <FTL key={stepperTab} />;
			case 'rail_domestic_freight': return <RAIL key={stepperTab} />;
			default: return <FTL />;
		}
	};

	return (
		<DashboardContext.Provider value={contextValues}>
			<div>
				<div className={styles.header}>
					<h1>SO2 Dashboard - Surface</h1>
					<Filters />
				</div>
				<StepperTabs />
				{getTabComponent()}
			</div>
		</DashboardContext.Provider>
	);
}
