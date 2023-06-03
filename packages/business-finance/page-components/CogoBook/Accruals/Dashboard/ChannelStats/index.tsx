import styles from './styles.module.css';

interface ChannelInterface {
	accrued?:number
	Booked?:number
}
function ChannelStats({ accrued, Booked }:ChannelInterface) {
	const calcWidthFirstBar = (accrued / Booked) * 100;
	const calcWidthSecondBar = 100 - calcWidthFirstBar;
	return (
		<div className={styles.container}>
			<div className={styles.content}>SME1</div>
			<div className={styles.charts}>
				<div className={styles.bar}>
					<div className={styles.first_bar} style={{ width: `${calcWidthFirstBar}%` }} />
					<div className={styles.second_bar} style={{ width: `${calcWidthSecondBar}%` }} />
				</div>
				<div className={styles.bar}>
					<div className={styles.first_bar} style={{ width: `${calcWidthFirstBar}%` }} />
					<div className={styles.second_bar} style={{ width: `${calcWidthSecondBar}%` }} />
				</div>
			</div>

		</div>
	);
}
export default ChannelStats;
