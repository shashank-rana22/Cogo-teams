import { useState } from 'react';

import Filters from './Filters';
import ForecastList from './ForecastList';
import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function PageView() {
	const [activeTab, setActiveTab] = useState('fcl_freight');

	const [filters, setFilters] = useState({});

	return (
		<div>
			<Header />
			<div className={styles.secondary_header}>
				<Tab activeTab={activeTab} setActiveTab={setActiveTab} />
				<Filters setFilters={setFilters} filters={filters} />
			</div>
			<ForecastList filters={filters} />
		</div>
	);
}
export default PageView;
