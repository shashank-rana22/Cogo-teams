import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CategoriesCard from './CategoriesCard';
import PerformanceCard from './PerformanceCard';
import styles from './styles.module.css';
import UserCard from './UserCard';

function Widget({ label = 'Top Users', subLabel = 'No of issues', data, type, loading, isMargin }) {
	const cardComponentMapping = {
		Users       : <UserCard data={data} loading={loading} />,
		Categories  : <CategoriesCard data={data} loading={loading} />,
		Performance : <PerformanceCard data={data} loading={loading} />,
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
			{CardComponent || null}
		</div>

	);
}

export default Widget;
