import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = '',
	flexDirection = 'row',
	textSize = '16px',
}) {
	const { t } = useTranslation(['allocation']);

	const emptyValue = emptyText || t('allocation:common_empty_text');

	return (
		<div className={`${styles.container} ${styles[flexDirection]}`}>
			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={width}
				height={height}
				alt="Empty-state"
				style={{ margin: '10px' }}
			/>

			<div className={styles.text} style={{ fontSize: textSize }}>{emptyValue}</div>
		</div>

	);
}

export default EmptyState;
