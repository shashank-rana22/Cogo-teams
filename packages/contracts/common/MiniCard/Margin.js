import styles from './styles.module.css';

const UNIT_MAPPING = {
	fcl_freight       : 'ctr',
	lcl_freight       : 'CBM',
	air_freight       : 'Kgs',
	fcl_freight_local : 'ctr',
	lcl_freight_local : 'CBM',
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
					{UNIT_MAPPING[service]}
				</div>
			</div>
		</div>
	);
}

export default Margin;
