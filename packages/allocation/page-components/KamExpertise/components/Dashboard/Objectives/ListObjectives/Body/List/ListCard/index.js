import styles from './styles.module.css';

function ListCard(props) {
	const { listItem, LIST_COLUMN_MAPPING } = props;

	return (
		<div className={styles.list_card}>
			{LIST_COLUMN_MAPPING.map((column) => {
				const { key, flex, accessor } = column;

				return (
					<div
						key={key}
						style={{ flex, flexDirection: 'column', alignItems: 'flex-start' }}
						className={styles.card_column}
					>
						{accessor(listItem)}
					</div>
				);
			})}
		</div>
	);
}

export default ListCard;
