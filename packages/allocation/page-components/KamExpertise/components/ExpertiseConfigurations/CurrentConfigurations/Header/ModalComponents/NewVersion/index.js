import { Input, Button } from '@cogoport/components';
import { IcMAlert } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function NewVersion(props) {
	const { t } = useTranslation(['allocation']);
	const { setMode, onCreate, createModalLoading, versionName, setVersionName } = props;

	return (
		<div className={styles.container}>
			<IcMAlert className={styles.alert_icon} />

			<Input
				size="sm"
				placeholder={t('allocation:version_name_placeholder')}
				style={{ width: '75%' }}
				value={versionName}
				onChange={(value) => { setVersionName(value); }}
			/>

			<div className={styles.supporting_text}>
				{t('allocation:version_name_supporting_text_phrase')}
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="tertiary"
					disabled={createModalLoading}
					onClick={() => {
						setMode('initial-mode');
					}}
					style={{ marginRight: '16px' }}
				>
					{t('allocation:back_button')}
				</Button>

				<Button
					disabled={isEmpty(versionName)}
					loading={createModalLoading}
					onClick={() => {
						onCreate();
					}}
				>
					{t('allocation:proceed_button')}
				</Button>
			</div>

		</div>

	);
}

export default NewVersion;
