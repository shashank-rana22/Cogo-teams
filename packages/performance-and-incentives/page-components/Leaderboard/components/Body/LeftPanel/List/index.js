import getListColumnMapping from './get-list-column-mapping';
import ListItem from './ListItem';
import styles from './styles.module.css';

function List(props) {
	const { list, params, setParams, handleClick } = props;

	// const { user = {} }	 = useSelector((state) => state?.profile || {});

	const LIST_COLUMN_MAPPING = getListColumnMapping({ params, setParams });

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
				{list.map((listItem, index) => (
					<ListItem
						key={listItem.id}
						listItem={listItem}
						index={index}
						handleClick={handleClick}
					/>
				))}
			</div>
		</div>
	);
}

export default List;
