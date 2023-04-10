import styles from './styles.module.css';

function FooterPriceBreakUpCard() {
	const ctrProfitabilityRevenue = [{
		label : 'Projected Revenue :',
		value : '$1,80,000',
		color : 'revenue',
	},
	{
		label : 'Projected Profitability :',
		value : '2.6 %',
		color : 'profitability',
	},
	{
		label : 'Price / Ctr :',
		value : '$1,60,000',
		color : 'pricectr',
	},
	];

	return (
		<div className={styles.container}>
			{
				ctrProfitabilityRevenue.map((item) => (
					<div className={styles.projected_section}>
						<div className={styles.text_projexted}>{item.label}</div>
						<div className={`${styles.value_projected} ${styles[item.color]}`}>{item.value}</div>
					</div>
				))
			}
			<button className={styles.save_changes_button}>Save Changes</button>
		</div>
	);
}
export default FooterPriceBreakUpCard;
