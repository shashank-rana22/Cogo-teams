import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function EmptyState({ heading = '' }) {
	const { t } = useTranslation(['operators']);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.ic_container}>
					<IcMSearchlight width={80} height={80} fill="#ee3425" />
				</div>
				<div className={styles.heading}>
					{`${t('operators:card_list_empty_state_content_sorry')} 
					${heading || t('operators:operators_default_value')} 
					${t('operators:card_list_empty_state_content_nothing_found')}`}
				</div>
				<div className={styles.content}>
					{t('operators:card_list_empty_state_content_try_another_way')}
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
