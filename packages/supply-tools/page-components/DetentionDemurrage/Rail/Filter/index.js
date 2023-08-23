import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Filter() {
	return (
		<div className={styles.container}>
			<Button themeType="secondary">
				<IcMFilter />
				{' '}
				FILTERS
			</Button>
		</div>
	);
}

export default Filter;
