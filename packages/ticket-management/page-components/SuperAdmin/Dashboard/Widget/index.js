import { cl } from '@cogoport/components';

import CategoriesCard from './CategoriesCard';
import PerformanceCard from './PerformanceCard';
import styles from './styles.module.css';
import UserCard from './UserCard';

const cardComponentMapping = {
	Users       : UserCard,
	Categories  : CategoriesCard,
	Performance : PerformanceCard,
};

function Widget({ label = 'Top Users', subLabel = 'No of issues', data, type, loading, isMargin }) {
	const CardComponent = cardComponentMapping[type];

	return (
		<div
			className={cl`${styles.container} ${styles[isMargin ? 'is_margin' : '']}`}
		>
			<div className={styles.header}>
				<div className={styles.title}>{label}</div>
				<div className={styles.title}>{subLabel}</div>
			</div>
			{CardComponent && <CardComponent key={type} data={data} loading={loading} />}
		</div>

	);
}

export default Widget;
