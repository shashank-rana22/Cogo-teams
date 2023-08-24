import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({ heading = 'results', placement = 'center' }) {
	const { t } = useTranslation(['airRepository']);
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{placement === 'center' ? (
					<div className={styles.ic_container}>
						<IcMSearchlight width={80} height={80} fill="#ee3425" />
					</div>
				) : null}
				<div className={styles.heading}>
					{t('airRepository:empty_state_text_sorry_no')}
					{' '}
					{heading}
					{' '}
					{t('airRepository:empty_state_text_found')}
					{' '}
					:(
				</div>
				<div className={styles.content}>
					{t('airRepository:empty_state_content')}
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
