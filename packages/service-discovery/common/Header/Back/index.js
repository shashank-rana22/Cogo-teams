import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const backScreen = (currentScreen) => {
	const MAPPING = {
		listRateCard       : 'back',
		selectedCardScreen : 'back',
		comparison         : 'listRateCard',
		bookCheckout       : 'selectedCardScreen',
	};
	return MAPPING[currentScreen] || 'back';
};

function Back({
	heading = 'Back',
	...rest
}) {
	const router = useRouter();

	const onBack = () => {
		const { currentScreen = '', setCurrentScreen = () => {} } = rest;
		const backscreen = backScreen(currentScreen);

		console.log('backscreen', backscreen);

		if (backscreen !== 'back') {
			setCurrentScreen(() => backscreen);
		} else {
			router.back();
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.back_button}>
				<IcMArrowBack
					height={20}
					width={20}
					style={{ cursor: 'pointer' }}
					onClick={onBack}
				/>

				<span>{heading || 'Back'}</span>
			</div>
		</div>
	);
}

export default Back;
