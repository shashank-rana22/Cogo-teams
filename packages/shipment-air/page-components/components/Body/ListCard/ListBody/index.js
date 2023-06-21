import ListLeftPart from './ListLeftPart';
import ListMiddlePart from './ListMiddlePart';
import ListRightPart from './ListRightPart';
import styles from './styles.module.css';

function ListBody({ item = {} }) {
	return (
		<div className={styles.list_body}>
			<ListLeftPart item={item} />
			<ListMiddlePart item={item} />
			<ListRightPart item={item} />
		</div>
	);
}
export default ListBody;
