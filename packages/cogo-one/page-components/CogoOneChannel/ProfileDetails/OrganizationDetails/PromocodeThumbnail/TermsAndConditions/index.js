import React from 'react';

import styles from './styles.module.css';

function TermsAndConditions({ termsAndConditions }) {
	return (
		<div className={styles.container}>
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
