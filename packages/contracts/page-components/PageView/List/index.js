import Card from './Card';
import styles from './styles.module.css';

function List({ data }) {
	return (
		<div className={styles.container}>
			{(data?.list || []).map((item) => <Card item={item} />)}
		</div>
	);
}

export default List;
