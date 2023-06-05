import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Content from './Content';
import Filters from './Filters';
import styles from './styles.module.css';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('approval');
	const formProps = useForm();

	const { watch, formState:{ dirtyFields } } = formProps;
	const { end_date, organization_size, search, service_type, start_date, profitability } = watch();

	const [filterStore, setFilterStore] = useState({
		activeTab,
		sortBy: '',
	});

	useEffect(() => {
		const [lowProfitability, highProfitability] = profitability || [];
		setFilterStore((prev) => ({
			...prev,
			activeTab,
			search,
			organizationSize  : organization_size,
			serviceType       : service_type,
			endDate           : end_date,
			startDate         : start_date,
			lowProfitability  : !dirtyFields.profitability ? undefined : lowProfitability,
			highProfitability : !dirtyFields.profitability ? undefined : highProfitability,
		}));
	}, [search, organization_size, service_type, start_date, end_date,
		activeTab, profitability, dirtyFields.profitability]);

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
