import styles from './styles.module.css';

function ListItem({ item }) {
	console.log('item', item);
	return (
		<div className={styles.list_item_container}>Hellos</div>
	);
}

export default ListItem;
