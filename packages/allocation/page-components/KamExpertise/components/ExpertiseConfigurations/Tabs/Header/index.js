import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({ auditData, loading }) {
	const { t } = useTranslation(['allocation']);

	const { name, updated_at } = auditData;

	return (
		<div className={styles.main_container}>
			<div className={styles.config_basic_detail}>
				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						{t('allocation:currently_editing')}
						:
						{' '}
					</div>

					<b>{t('allocation:saved_draft_label')}</b>
				</div>

				<div className={styles.lower_details}>
					<div className={styles.lower_info}>
						<div>
							{t('allocation:last_modified_label')}
							{' '}
							:&nbsp;
						</div>

						<span>
							{loading ? <Placeholder height="20px" width="120px" />
								: ((updated_at && (formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
									formatType : 'date',
								}))) || '')}
						</span>
					</div>

					<div className={styles.lower_info} style={{ marginLeft: '36px' }}>
						<div>
							{t('allocation:last_edit_by_label')}
							{' '}
							:&nbsp;
						</div>

						{loading ? <Placeholder height="20px" width="120px" /> : <b>{startCase(name || '')}</b>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
