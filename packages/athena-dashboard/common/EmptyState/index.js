import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	emptyText = '',
	flexDirection = 'row',
	textSize = '16px',
}) {
	const { t } = useTranslation(['athenaDashboard']);

	const emptyValue = emptyText || t('athenaDashboard:common_empty_text');

	return (
		<div className={`${styles.empty_state} ${styles[flexDirection]}`}>
			<div style={{ justifyContent: 'center', display: 'flex' }}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
					width={width}
					height={height}
					alt="Empty-state"
					style={{ margin: '10px' }}
				/>
			</div>
			<div style={{ fontSize: textSize, textAlign: 'center' }}>{emptyValue}</div>
		</div>

	);
}

export default EmptyState;
