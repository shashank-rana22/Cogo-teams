import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { table_list = [] } = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	return (
		<div className={styles.list_container}>
			<div className={styles.list_header_container}>
				{LIST_COLUMN_MAPPING.map((item) => {
					const { key, Header, flex } = item;

					if (!Header) return <div />;

					return <div key={key} style={{ flex }}>{Header}</div>;
				})}
			</div>

			<div className={styles.list_body_container}>
				{table_list.map((listItem) => (
					<div key={listItem.id} className={styles.list_row}>
						{LIST_COLUMN_MAPPING.map((columnItem) => {
							const { key, flex, accessor } = columnItem;

							return (
								<div
									key={key}
									style={{ flex }}
									className={styles.list_column}
								>
									{accessor(listItem)}
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

export default List;
