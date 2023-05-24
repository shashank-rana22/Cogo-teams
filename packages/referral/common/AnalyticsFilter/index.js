import { Input } from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function AnalyticsFilter() {
	return (
		<div className={styles.container}>
			<Input prefix={<IcMSearchlight />} size="md" placeholder="Search here..." />
			<IcMFilter className={styles.filter_icon} />
		</div>
	);
}
export default AnalyticsFilter;
