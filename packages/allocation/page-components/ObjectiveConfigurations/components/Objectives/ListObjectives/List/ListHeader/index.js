import styles from './styles.module.css';

function ListHeader(props) {
	const { LIST_COLUMN_MAPPING } = props;

	return	(
		<div className={styles.list_header_container}>
			{LIST_COLUMN_MAPPING.map((column) => {
				const { key, flex, Header } = column;

				if (!Header) return null;

				return <div key={key} style={{ flex }} className={styles.column_container}>{Header}</div>;
			})}
		</div>
	);
}

export default ListHeader;
