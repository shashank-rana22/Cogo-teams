import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function BackToEnrichment() {
	const router = useRouter();

	const goToDashboard = () => {
		router.push('/enrichment');
	};

	return (
		<div>
			<button className={styles.btn} onClick={() => goToDashboard()}>
				<IcMArrowBack />

				<div className={styles.backer}>
					Back to Enrichment
				</div>
			</button>
		</div>
	);
}

export default BackToEnrichment;
