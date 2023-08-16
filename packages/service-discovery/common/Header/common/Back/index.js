import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const BACK_SCREEN_MAPPING = {
	comparison: 'listRateCard',
};

function Back({
	heading = 'Back',
	currentScreen = '',
	setCurrentScreen = () => {},
}) {
	const router = useRouter();

	const onBack = () => {
		const backscreen = BACK_SCREEN_MAPPING[currentScreen] || 'back';

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
