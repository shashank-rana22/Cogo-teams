import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState() {
	const { t } = useTranslation(['amsSubmission']);
	const amsEmptyStateSrc = GLOBAL_CONSTANTS.image_url.ams_empty_state;

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.header}>{t('amsSubmission:no_shipments_found')}</div>
				<div className={styles.sub_header}>{t('amsSubmission:no_results_found')}</div>
			</div>

			<Image
				src={amsEmptyStateSrc}
				alt={t('amsSubmission:empty_page_alt')}
				height={300}
				width={450}
			/>
		</div>
	);
}

export default EmptyState;
