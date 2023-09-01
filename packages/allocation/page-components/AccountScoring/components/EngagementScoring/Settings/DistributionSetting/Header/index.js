import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({ setEditing = () => {}, loading }) {
	const { t } = useTranslation(['allocation']);

	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>{t('allocation:account_distribution')}</div>

				<Tooltip
					className={styles.word_break}
					content={t('allocation:distribution_setting_tooltip_data')}
					placement="top"
				>
					<IcMInfo height={16} className={styles.info_icon} />
				</Tooltip>
			</div>

			<div>
				<Button
					themeType="secondary"
					onClick={() => setEditing((pv) => !pv)}
					disabled={loading}
				>
					{' '}
					{t('allocation:distribution_setting_edit_button')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
