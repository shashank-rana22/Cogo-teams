import ListBody from './ListBody';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

function ListCard({ item = {} }) {
	return (
		<div className={styles.list_card}>
			<ListHeader item={item} />
			<ListBody item={item} />
		</div>
	);
}
export default ListCard;
