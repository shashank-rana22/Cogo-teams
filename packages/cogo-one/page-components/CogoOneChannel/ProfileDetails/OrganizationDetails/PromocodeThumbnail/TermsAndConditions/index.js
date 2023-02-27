import React from 'react';

import styles from './styles.module.css';

function TermsAndConditions({ termsAndConditions }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Terms and Conditions</div>
			{(termsAndConditions || []).map((item) => (
				<div>
					<span>-</span>
					<span>
						{item}
					</span>
				</div>
			))}
		</div>
	);
}

export default TermsAndConditions;
