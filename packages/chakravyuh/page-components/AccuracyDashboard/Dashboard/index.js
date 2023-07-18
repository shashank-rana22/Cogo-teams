import React from 'react';

import SupplyRates from '../RatesList';

import Accuracy from './Accuracy';
import Deviation from './Deviation';
import Distribution from './Distribution';
import styles from './styles.module.css';
import Views from './Views';

function DashboardView(props) {
	const { setView = () => {}, filters = {} } = props;
	const { pieChartView = 'default' } = filters;
	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.graph_container}>
					<Accuracy />
					<Deviation />
				</div>
				<div className={styles.side_container}>
					<Views setView={setView} />
					<Distribution {...props} />
				</div>
			</div>
			<SupplyRates {...props} visible={pieChartView !== 'default'} />
		</>
	);
}

export default DashboardView;
