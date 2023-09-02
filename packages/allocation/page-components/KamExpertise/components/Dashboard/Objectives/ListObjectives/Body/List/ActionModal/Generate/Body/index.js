import { Loader } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from '../../styles.module.css';

function Body({
	loading,
	contentLoader,
}) {
	const { t } = useTranslation(['allocation']);

	if (loading || contentLoader) {
		return (
			<>
				<div className={styles.loader_container}>
					<Loader style={{ height: 64, width: 64 }} themeType="primary" />
					<div className={styles.loading_text}>
						{t('allocation:loading_label')}
					</div>
				</div>
				<div className={styles.info_text}>
					{t('allocation:please_wait_generating_kams_applicable')}
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.loader_container}>
				<div className={styles.loading_text}>
					{t('allocation:generate_list_heading')}
				</div>
			</div>
			<div className={styles.info_text}>
				{t('allocation:generate_list_phrase')}
				{' '}
				<b>
					‘
					{t('allocation:view_list')}
					’
				</b>
				{' '}
				{t('allocation:generate_list_desciption')}
			</div>
		</>
	);
}

export default Body;
