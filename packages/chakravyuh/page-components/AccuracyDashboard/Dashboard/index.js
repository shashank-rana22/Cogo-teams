import React from 'react';

import Accuracy from './Accuracy';
import Deviation from './Deviation';
import Distribution from './Distribution';
import styles from './styles.module.css';
import Views from './Views';

function DashboardView(props) {
	const { setView = () => {} } = props;
	return (
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

	);
}

export default DashboardView;
