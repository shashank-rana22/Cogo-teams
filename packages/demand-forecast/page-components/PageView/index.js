import { useState } from 'react';

import Filters from './Filters';
import ForecastList from './ForecastList';
import Header from './Header';
import styles from './styles.module.css';
import Tab from './Tab';

function PageView() {
	const [activeTab, setActiveTab] = useState('port_pairs');
	return (
		<div>
			<Header />
			<div className={styles.secondary_header}>
				<Tab activeTab={activeTab} setActiveTab={setActiveTab} />
				<Filters />
			</div>
			<ForecastList activeTab={activeTab} />
		</div>
	);
}
export default PageView;
