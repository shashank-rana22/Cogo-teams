import Card from './Card';
import styles from './styles.module.css';

function List({ data, filters }) {
	return (
		<div className={styles.container}>
			{(data?.list || []).map((item) => <Card item={item} filters={filters} />)}
		</div>
	);
}

export default List;
