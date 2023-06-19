import Graph from './Graph';
import styles from './styles.module.css';

function Stats({ data }) {
	return (
		<div className={styles.parent}>
			<div className={styles.left}>
				<div className={styles.heading}>Rate Coverage</div>
				<div>
					<div className={styles.blue_color_stat_number}>
						{data?.marketplace_rates_count}
					</div>
					<div className={styles.sub_text}>
						Marketplace Rates as per today
					</div>
				</div>
			</div>

			<div className={styles.right}>
				<Graph data={data?.frequency_list || []} />
			</div>
		</div>

	);
}

export default Stats;
