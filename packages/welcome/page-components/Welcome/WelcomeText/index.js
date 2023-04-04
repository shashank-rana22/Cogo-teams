import React from 'react';

import styles from './styles.module.css';

function WelcomeText() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Partners, Our Network is Yours!</div>
			<div className={styles.description}>
				By partnering with Cogoport, you have invested in your growth,
				and we will do everything in our power to support you on this journey.
				In return, we need your engagement and your judgement of the logistics industry to do better,
				run faster and achieve big milestones. Let’s begin the journey towards improved efficiencies,
				higher profitability and a better industry together!
			</div>
			<div className={styles.regards_section}>
				<span>Amitabh Shankar</span>
				<span>CEO - Logistics</span>
				<span>Cogoport</span>
			</div>
		</div>
	);
}

export default WelcomeText;
