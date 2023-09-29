import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({
	formattedData = {},
	onMarkAllAsRead = () => {},
	onSeeAll = () => {},
}) {
	const { t } = useTranslation(['common']);

	return (
		<div className={styles.header_container}>

			<h3 className={styles.header}>{t('common:tab_notifications_label')}</h3>

			{!isEmpty(formattedData?.list || []) ? (
				<div className={styles.row}>
					<div
						onClick={onMarkAllAsRead}
						role="presentation"
						className={styles.mark_read}
					>
						{t('common:mark_all_as_read')}
					</div>

					<Button
						size="sm"
						themeType="primary"
						onClick={onSeeAll}
					>
						{t('common:see_all_button')}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Header;
