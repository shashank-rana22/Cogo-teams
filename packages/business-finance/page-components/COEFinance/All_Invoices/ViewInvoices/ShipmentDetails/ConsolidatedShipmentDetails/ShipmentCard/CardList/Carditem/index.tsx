import styles from './styles.module.css';

function Item({
	item,
	fields,
}) {
	return (
		<div className={styles.row}>
			{fields?.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				const { span, render = () => {}, label } = singleItem || {};
				const widthVal = (span / 12) * 100;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={label}
						className={styles.column}
					>
						{render(item)}
					</div>
				);
			})}
		</div>
	);
}

export default Item;
