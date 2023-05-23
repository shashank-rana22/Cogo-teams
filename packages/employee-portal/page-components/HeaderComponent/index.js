import styles from './styles.module.css';

function HeaderComponent({ name }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Hi
				{' '}
				{name}
				, Welcome to Cogoport
			</div>

			<div className={styles.sub_text}>
				Partners, Our Network is Yours!
			</div>

			<div className={styles.main_text}>

				By partnering with Cogoport, you have invested in your growth,
				and we will do everything in our power to support you on this journey.
				In return, we need your
				engagement and your judgement of the logistics industry to do better,
				run faster and achieve big milestones. Let’s begin the journey towards improved efficiencies,
				higher profitability and a better industry together!

			</div>
			<div className={styles.sub_text}>
				We are as excited as you are to grow your business multifold by next year.
				We are solving numerous challenges associated with growing business
				internationally such as procuring quotations from right agents,
				recruiting experienced talent, and getting instant solutions. We bring Cogoport Partner Platform to you!
			</div>

			<div className={styles.main_text}>
				<div>
					Amitabh Shankar
				</div>
				<div>
					CEO - Logistics Cogoport
				</div>
			</div>

		</div>
	);
}

export default HeaderComponent;
