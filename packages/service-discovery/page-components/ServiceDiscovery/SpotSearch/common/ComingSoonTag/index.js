import { Pill, cl } from '@cogoport/components';

import styles from './styles.module.css';

function ComingSoon({ bouncing = false }) {
	return (
		<div className={cl`${styles.pill} ${bouncing && styles.bounce}`}>
			<Pill size="sm" color="yellow">Coming Soon</Pill>
		</div>
	);
}

export default ComingSoon;
