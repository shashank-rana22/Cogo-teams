import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header() {
	const { t } = useTranslation(['demandForecast']);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t('demandForecast:heading')}
			</div>
		</div>
	);
}

export default Header;
