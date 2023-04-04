import React from 'react';

// import MyResponsiveLine from './LineChart';
import styles from './styles.module.css';

function WelcomeText() {
	return (
		<div className={styles.container}>
			<div className={styles.text_container}>
				<div className={styles.text}>
					We are thrilled to have you on board, and we can &apos;t wait to see the amazing
					impact you &apos;ll make with your unique skills and talent. We want to ensure that you have
					the best possible start to your journey with us.

				</div>
				<div className={styles.text}>
					We believe in empowering our team members, and we want you to feel confident
					and motivated as you start this new chapter in your career. In the lead-up to the 2-day
					interactive program with us, you will find reading materials and FAQs to help you get a
					head start on your onboarding journey. We want to ensure that you have all the
					knowledge you need about the global trade to hit the ground running.
				</div>
				<div className={styles.text}>
					As you embark on this exciting new opportunity with Cogoport,
					we encourage you to embrace every challenge, learn as much as possible,
					and have fun along the way. We are excited to meet you all and welcome you to our family.
				</div>
				<div>Let &apos;s make great things happen together!</div>
			</div>

			{/* <div className={styles.chart_container}>
				<div className={styles.chart_heading}>
					<strong>{name.split(' ')[0] }</strong>
					, here’s how you engaged
				</div>
				<MyResponsiveLine />
			</div> */}

		</div>
	);
}

export default WelcomeText;
