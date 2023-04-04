import React from 'react';

// import MyResponsiveLine from './LineChart';
import styles from './styles.module.css';

function WelcomeText() {
	return (
		<div className={styles.container}>
			<div className={styles.text_container}>

				<div className={styles.text}>
					I am thrilled to congratulate each and every one of you on your selection to join our team!
				</div>

				<div className={styles.text}>
					People at Cogoport have a saying that
					<strong>
						<i>
							{' '}
							‘it is a high-paced environment with 50 different start-ups within the organization’.
						</i>
					</strong>
					{' '}
					To succeed in this environment, you must equip yourselves with the knowledge and background of
					how global trade works. This is why I urge you all to focus on learning and self-training during
					the next two weeks, so that we can make the most of our time together when we meet again
					on your day-1. I am sure the team will be sending you all the necessary learning materials
					and content, so that you can make the most of this time.
				</div>

				<div className={styles.text}>
					I am cancelling all my travel plans and meetings to dedicate as much time as possible to
					guide you during your first 2 days of joining. During this time, please do not
					hesitate to ask me anything related to Cogoport.
				</div>

				<div className={styles.text}>
					Whether we &apos;ve met or not, I&apos; m positive that you all possess
					what is takes to succeed at Cogoport and to help us achieve our goals and grow
					as a company. I wish you all the best in your learning journey, and I look forward
					to seeing you all on Day-1.
				</div>
				<div className={styles.regards}>
					<span>Best regards,</span>
					<span>Amitabh Shankar</span>
				</div>
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
