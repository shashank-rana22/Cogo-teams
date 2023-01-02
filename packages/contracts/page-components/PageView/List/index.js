import Card from './Card';
import styles from './styles.module.css';

function List({ setShowDetail, data }) {
	return (
		<div className={styles.container}>
			{(data?.list || []).map((item) => <Card setShowDetail={setShowDetail} item={item} />)}
		</div>
	);
}

export default List;
