import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const BACK_SCREENS_MAPPING = {
	comparison: 'listRateCard',
};

function Back({
	currentScreen = '',
	setCurrentScreen = () => {},
}) {
	const { push, back } = useRouter();

	const onBack = () => {
		if (currentScreen === 'listRateCard') {
			push('/service-discovery');
			return;
		}

		const previousScreen = BACK_SCREENS_MAPPING[currentScreen];
		if (previousScreen) {
			setCurrentScreen(previousScreen);
			return;
		}

		back();
	};

	return (
		<IcMArrowBack
			height={20}
			width={20}
			className={styles.back_icon}
			onClick={onBack}
		/>
	);
}

export default Back;
