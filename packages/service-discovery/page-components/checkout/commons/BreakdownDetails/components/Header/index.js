import styles from './styles.module.css';

const HEADER_COMPONENTS = [
	{
		label     : 'Service Name',
		key       : 'service_name',
		flexBasis : '36%',
	},
	{
		label     : 'Currency',
		key       : 'currency',
		flexBasis : '10%',
	},
	{
		label     : 'Original Price',
		key       : 'service_name',
		flexBasis : '9%',
	},
	{
		label     : 'Unit',
		key       : 'unit',
		flexBasis : '11%',
	},
	{
		label     : 'Qty.',
		key       : 'quantity',
		flexBasis : '6%',
	},
	{
		label     : 'Margin Type',
		key       : 'margin_type',
		flexBasis : '10%',
	},
	{
		label     : 'Margin Value',
		key       : 'margin_value',
		flexBasis : '9%',
	},
	{
		label     : 'Final Price',
		key       : 'final_price',
		flexBasis : '9%',
	},
];

function Header() {
	return (
		<div className={styles.container}>
			{HEADER_COMPONENTS.map((item) => {
				const { label, key, flexBasis } = item;

				return (
					<div key={key} style={{ flexBasis }} className={styles.item}>
						{label}
					</div>
				);
			})}
		</div>
	);
}

export default Header;
