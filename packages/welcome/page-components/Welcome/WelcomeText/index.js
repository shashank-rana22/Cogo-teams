import React from 'react';

// import MyResponsiveLine from './LineChart';
import styles from './styles.module.css';

function WelcomeText() {
	return (
		<div className={styles.container}>
			<div className={styles.text_container}>

				<div className={styles.text}>
					I want to congratulate each and every one of you on your selection to join our team! Generally,
					we hire only 1 out of every 100 applications;
					so congrats once again for being a part of the selected few.
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
					how global trade works, demonstrate perseverance and be a life-long learner. I urge you all to
					focus on learning and self-training during the next two weeks, so that we can make the most of
					our time together and engage in a high-intensity and meaningful conversation about your role at
					Cogoport. I am certain that the team will be sending you all the necessary learning materials
					and help you to self-assess your learnings.
				</div>

				<div className={styles.text}>
					To ensure that I can spend quality time with you all,
					I am cancelling all my travel plans and meetings
					during the first 2 days of your joining. It is up to you to make the most of this time and ask me
					anything related to Cogoport.
				</div>

				<div className={styles.text}>
					Whether we &apos;ve met or not, I&apos; m positive that you all possess
					what it takes to succeed at Cogoport and to help us achieve our goals and grow
					as a company. I wish you all the best in creating an impactful journey for yourself and
					I look forward to seeing you all on Day-1.
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
