import styles from './styles.module.css';

const TOTAL_WIDTH = 100;
const TOTAL_SPAN = 12;

function Item({
	item,
	fields,
}) {
	return (
		<div className={styles.row}>
			{fields.map((singleItem) => {
				const { span, render = () => {}, key } = singleItem;
				const widthVal = (span / TOTAL_SPAN) * TOTAL_WIDTH;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={key}
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
