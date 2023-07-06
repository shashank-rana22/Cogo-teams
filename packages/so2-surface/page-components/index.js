import { useRouter } from 'next/router';
import { useState, useCallback, useMemo } from 'react';

import DashboardContext from '../context/DashboardContext';
import getLocalStorageVal from '../helpers/getLocalStorageVal';

import FTL from './FTL';
import Filters from './FTL/Filters';
import StepperTabs from './FTL/StepperTabs';
import RAIL from './RAIL';
import styles from './styles.module.css';

export default function SO2Surface() {
	const defaultValues = getLocalStorageVal();
	const router = useRouter();

	const [filters, setFilters] = useState(defaultValues?.filters);
	const [stepperTab, setStepperTab] = useState(defaultValues?.stepperTab);
	const [activeTab, setActiveTab] = useState(defaultValues?.activeTab);
	const [scopeFilters] = useState(defaultValues?.scopeFilters);

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
		localStorage.setItem('document_desk_version', 'v1');
	}, [router.asPath]);

	const contextValues = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		scopeFilters,
		handleVersionChange,
		stepperTab,
		setStepperTab,
	}), [activeTab, setActiveTab, filters, setFilters, scopeFilters, handleVersionChange, stepperTab, setStepperTab]);

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
