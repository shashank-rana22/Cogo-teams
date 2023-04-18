import Filter from './Filter';
import styles from './styles.module.css';

function List(props) {
	return (
		<div className={styles.container}>
			<Filter {...props} />
		</div>
	);
}

export default List;
