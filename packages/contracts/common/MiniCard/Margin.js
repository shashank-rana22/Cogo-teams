import styles from './styles.module.css';

const serviceToUnit = {
	fcl_freight : 'ctr',
	lcl_freight : 'CBM',
	air_freight : 'Kgs',
};
function Margin({ heading = '', value = '', service = 'fcl_freight' }) {
	return (
		<div className={styles.card}>
			<div className={styles.heading}>{heading}</div>
			<div className={styles.margin}>
				<div className={styles.value_ctr}>
					$
					{value}
					/
					{serviceToUnit[service]}
				</div>
			</div>
		</div>
	);
}

export default Margin;
