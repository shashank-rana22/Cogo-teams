import { cl } from '@cogoport/components';

import CategoriesCard from './CategoriesCard';
import PerformanceCard from './PerformanceCard';
import styles from './styles.module.css';
import UserCard from './UserCard';

function Widget({ label = 'Top Users', subLabel = 'No of issues', data, type, loading, isMargin }) {
	const cardComponentMapping = {
		Users       : UserCard,
		Categories  : CategoriesCard,
		Performance : PerformanceCard,
	};

	const CardComponent = cardComponentMapping[type];

	return (
		<div
			className={cl`${styles.container} ${styles[isMargin ? 'is_margin' : '']}`}
		>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
			<CardComponent data={data} loading={loading} />
		</div>

	);
}

export default Widget;
