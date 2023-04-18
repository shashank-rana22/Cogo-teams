import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import Content from './Content';
import Filters from './Filters';
import styles from './styles.module.css';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('local_rates');

	const formProps = useForm();

	const { watch } = formProps;

	const watchFilters = watch();

	const [filterData, setFilterData] = useState({});

	console.log('filterData: ', filterData);

	return (
		<div>
			<div className={styles.title}>RFQ Dashboard</div>

			<div className={styles.container}>
				<Filters formProps={formProps} />
				<Content activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
		</div>
	);
}

export default Dashboard;
