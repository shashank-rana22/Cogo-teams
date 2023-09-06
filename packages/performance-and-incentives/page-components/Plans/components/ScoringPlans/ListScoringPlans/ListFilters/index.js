import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListFilters() {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>12 Scoring Plans</p>

			<Button
				type="button"
				size="md"
				themeType="secondary"
			>
				<IcMFilter style={{ marginRight: '4px' }} />
				Filter
			</Button>
		</div>
	);
}

export default ListFilters;
