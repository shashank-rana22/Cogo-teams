import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function BackButton() {
	const router = useRouter();

	const goToDashboard = () => {
		router.push('/vendors');
	};

	return (
		<div>
			<button className={styles.btn} onClick={() => goToDashboard()}>
				<IcMArrowBack />

				<div className={styles.backer}>
					Back to Dashboard
				</div>
			</button>
		</div>
	);
}

export default BackButton;
