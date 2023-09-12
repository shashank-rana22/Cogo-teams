import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState({
	height = 125,
	width = 225,
	flexDirection = 'row',
	text = '',
}) {
	const { t = () => {} } = useTranslation(['settlement']);
	return (
		<div className={cl`${styles.container} ${styles[flexDirection]}`}>
			<img
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				width={width}
				height={height}
				alt={t('settlement:empty_state_alt_message')}
				className={styles.image}
			/>

			<div>
				<span className={styles.criteria}>
					{t('settlement:no_result_message')}

				</span>
				<div className={styles.horizontal} />
				<div>
					{text}
				</div>
			</div>

		</div>

	);
}

export default EmptyState;
