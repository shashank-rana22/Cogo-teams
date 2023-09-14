import { Button, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({ heading = '', tooltipData = '', onClose = () => {} }) {
	const { t } = useTranslation(['allocation']);

	return (
		<div className={styles.header}>
			<div className={styles.heading}>
				<div className={styles.label}>{heading}</div>
				<Tooltip
					className={styles.word_break}
					content={tooltipData}
					placement="top"
				>
					<IcMInfo height={16} className={styles.info_icon} />
				</Tooltip>
			</div>

			<div className={styles.btn}>
				<Button
					themeType="secondary"
					onClick={onClose}
				>
					{t('allocation:cancel_button')}
				</Button>

				<Button
					type="submit"
					themeType="primary"
					style={{ marginLeft: '8px' }}
				>
					{t('allocation:save_button')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
