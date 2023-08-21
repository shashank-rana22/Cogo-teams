import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Back({
	heading = 'Back',
	currentScreen = '',
}) {
	const { push, back } = useRouter();

	const onBack = () => {
		if (currentScreen === 'listRateCard') {
			push('/service-discovery');
			return;
		}

		back();
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
