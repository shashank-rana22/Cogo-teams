import ListItem from './ListItem';
import styles from './styles.module.css';

function List({ list }) {
	return (
		<div className={styles.list_container}>
			{list.map((item = {}) => (
				<ListItem key={item.id} item={item} />
			))}
		</div>
	);
}

export default List;
