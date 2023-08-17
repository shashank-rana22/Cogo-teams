import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Back({
	heading = 'Back',
	setCurrentScreen = () => {},
}) {
	const onBack = () => {
		const newUrl = new URL(window.location);
		newUrl.searchParams.delete('rate_card_id');

		window.history.pushState({ path: newUrl.href }, '', newUrl.href);
		setCurrentScreen('listRateCard');
	};

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
