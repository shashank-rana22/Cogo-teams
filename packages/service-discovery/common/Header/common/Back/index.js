import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useCallback } from 'react';

import styles from './styles.module.css';

function Back({
	heading = 'Back',
	setCurrentScreen = () => {},
	currentScreen = '',
}) {
	const { push } = useRouter();

	const onBack = () => {
		if (currentScreen === 'listRateCard') {
			push('/service-discovery');
			return;
		}
		const newUrl = new URL(window.location);
		newUrl.searchParams.delete('rate_card_id');

		window.history.pushState({ path: newUrl.href }, '', newUrl.href);
		setCurrentScreen('listRateCard');
	};

	const handleBrowserBack = useCallback(() => {
		push('/service-discovery');
	}, [push]);

	useEffect(() => {
		window.addEventListener('popstate', handleBrowserBack);

		return () => {
			window.removeEventListener('popstate', handleBrowserBack);
		};
	}, [handleBrowserBack]);

	return (
		<div className={styles.container}>
			<IcMArrowBack
				height={20}
				width={20}
				className={styles.back_icon}
				onClick={onBack}
			/>

			<span>{heading || 'Back'}</span>
		</div>
	);
}

export default Back;
