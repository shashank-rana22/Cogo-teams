import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const EmptyState = () => {
	<div className={styles.empty_state}>
		<IcMSearchlight
			style={{ width: '300px', height: '200px' }}
		/>
		Sorry, We Could Not Find What You Were Looking For
	</div>;
};
export default EmptyState;
