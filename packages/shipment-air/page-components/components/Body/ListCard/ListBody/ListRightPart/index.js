import CargoDetails from './cargo-details';
import styles from './styles.module.css';

function ListRightPart({ item = {} }) {
	return (
		<div className={styles.list_right_part}><CargoDetails item={item} /></div>
	);
}
export default ListRightPart;
