import styles from './styles.module.css';

function PriceFreightCtr() {
	const data = [
		{
			label  : 'Price / Ctr',
			amount : '$ 1,40,000',

		},
		{
			label  : 'Freight / Ctr',
			amount : '$ 1,40,000',
		},
	];
	return (

		<div className={styles.container}>
			{
				data.map((Item) => (
					<div className={styles.get_amount_section}>
						<div className={styles.get_amount_type}>{Item.label}</div>
						<div className={styles.get_amount_value}>{Item.amount}</div>
					</div>
				))
			}
		</div>

	);
}
export default PriceFreightCtr;
