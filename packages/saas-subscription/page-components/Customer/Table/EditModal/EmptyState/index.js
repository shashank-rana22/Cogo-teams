import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState({ currentTab = '' }) {
	const { t } = useTranslation(['saasSubscription']);
	return (
		<div className={styles.empty_ctn}>
			<Image
				className={styles.empty_state}
				src={GLOBAL_CONSTANTS.image_url.ticket_not_found}
				width={150}
				height={150}
				alt="empty_state"
			/>
			<p style={{ textAlign: 'center' }}>
				{`${t('saasSubscription:empty_state_1')} ${startCase(currentTab)}
				${t('saasSubscription:empty_state_2')}`}

			</p>
		</div>

	);
}

export default EmptyState;
