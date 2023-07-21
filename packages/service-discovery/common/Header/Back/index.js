import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

// import ToggleSwitch from '../../../page-components/SearchResults/components/DarkLightMode';

import styles from './styles.module.css';

const backScreen = (currentScreen) => {
	const MAPPING = {
		listRateCard : 'back',
		selectedCard : 'back',
		comparison   : 'selectedCard',
		bookCheckout : 'selectedCard',
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

			{/* <div style={{ marginRight: 8 }}>
				<ToggleSwitch />
			</div> */}
		</div>
	);
}

export default Back;
