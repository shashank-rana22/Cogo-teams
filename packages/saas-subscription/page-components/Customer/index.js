import { useState } from 'react';

import ArrowStepper from '../../common/ArrowStepper';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';
import Table from './Table';

const items = [
	{ title: 'Total Count', key: 'total', count: 100 },
	{ title: 'Potential Users', key: 'potential', count: 30 },
	{ title: 'Active Users', key: 'active', count: 7 },
	{ title: 'Expired Plans', key: 'expired', count: 80 },
];

function CustomerSubscription() {
	const [activeKey, setActiveKey] = useState('total');
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<FilterContainer />
				<ArrowStepper
					active={activeKey}
					setActive={setActiveKey}
					items={items}
				/>
				<Table />
			</div>

		</div>
	);
}

export default CustomerSubscription;
