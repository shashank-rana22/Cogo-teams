import { useTranslation } from 'next-i18next';
import React from 'react';

function Home() {
	const { t } = useTranslation(['home']);

	return (
		<div>
			<h1>{t('home:title')}</h1>
		</div>
	);
}

export default Home;
