import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	const { t } = useTranslation(['airRepository']);
	return (
		<header>
			<div className={styles.heading}>
				{t('airRepository:heading')}
			</div>
		</header>
	);
}

export default Header;
