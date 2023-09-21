import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import CategoriesCard from './CategoriesCard';
import PerformanceCard from './PerformanceCard';
import styles from './styles.module.css';
import UserCard from './UserCard';

const cardComponentMapping = {
	Users       : UserCard,
	Categories  : CategoriesCard,
	Performance : PerformanceCard,
};

function Widget({
	label = '', subLabel = '', data = [],
	type = '', loading = false, isMargin = false,
}) {
	const { t } = useTranslation(['myTickets']);

	const CardComponent = cardComponentMapping[type];

	return (
		<div
			className={cl`${styles.container} ${styles[isMargin ? 'is_margin' : '']}`}
		>
			<div className={styles.header}>
				<div className={styles.title}>{label || t('myTickets:top_users')}</div>
				<div className={styles.title}>{subLabel || t('myTickets:no_of_issues')}</div>
			</div>

			{CardComponent
			&& <CardComponent key={type} data={data} loading={loading} />}
		</div>

	);
}

export default Widget;
