import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Content from './Content';
import Filters from './Filters';
import styles from './styles.module.css';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('approval');
	const formProps = useForm();

	const { watch } = formProps;
	const { end_date, organization_size, status, search, service_type, start_date } = watch();

	const [filterStore, setFilterStore] = useState({
		activeTab,
		sortBy: '',
	});

	useEffect(() => {
		setFilterStore((prev) => ({
			...prev,
			activeTab,
			search,
			status,
			organizationSize : organization_size,
			serviceType      : service_type,
			endDate          : end_date,
			startDate        : start_date,
		}));
	}, [search, organization_size, status, service_type, start_date, end_date, activeTab, filterStore.sortBy]);

	return (
		<div>
			<div className={styles.title}>RFQ Dashboard</div>

			<div className={styles.container}>
				<Filters formProps={formProps} />

				<Content
					filterStore={filterStore}
					setFilterStore={setFilterStore}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
		</div>
	);
}

export default Dashboard;
