import ListItem from './ListItem';
import styles from './styles.module.css';

function List({ list }) {
	return (
		<div className={styles.list_container}>
			{list.map((item = {}) => (
				<ListItem item={item} />
			))}

		</div>
	);
}

export default List;
