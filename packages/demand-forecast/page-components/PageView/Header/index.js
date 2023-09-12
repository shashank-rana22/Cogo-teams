import ScopeSelect from '@cogoport/scope-select/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header() {
	const { t } = useTranslation(['demandForecast']);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t('demandForecast:heading')}
			</div>
			<div className={styles.scope_select}>
				<ScopeSelect
					size="md"
				/>
			</div>

		</div>
	);
}

export default Header;
