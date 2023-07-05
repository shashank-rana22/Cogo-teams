import { Button, Input } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Filters() {
	return (
		<div className={styles.filter_container}>
			<div className={styles.select_container}>
				<Input size="sm" placeholder="Search by Objective Name" />
			</div>

			<Button themeType="secondary" type="button">
				<IcMFilter style={{ marginRight: '4px' }} />
				Filter
			</Button>
		</div>
	);
}

export default Filters;
