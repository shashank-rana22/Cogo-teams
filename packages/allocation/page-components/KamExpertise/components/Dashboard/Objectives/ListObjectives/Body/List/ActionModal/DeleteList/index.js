import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from '../styles.module.css';

function DeleteList() {
	const { t } = useTranslation(['allocation']);
	return (
		<div className={styles.delete_modal_body}>
			<div>
				<strong>
					{t('allocation:delete_list_heading')}
					{' '}
				</strong>
				{t('allocation:delete_list_phrase')}
			</div>
			<div style={{ marginTop: '24px' }}>
				{t('allocation:delete_list_description')}
			</div>
		</div>
	);
}

export default DeleteList;
