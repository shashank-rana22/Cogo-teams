import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function DotLoader({ dotsLength = 6, size = 'md' }) {
	return (
		<div className={cl`${styles.wave} ${styles[size]}`}>
			{[...Array(dotsLength).keys()].map((key) => (
				<span key={key} className={cl`${styles.dot} ${styles[size]}`} />
			))}
		</div>
	);
}

export default DotLoader;
