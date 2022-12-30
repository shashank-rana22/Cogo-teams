import Card from './Card';
import styles from './styles.module.css';

function List({ setShowDetail }) {
	return (
		<div className={styles.container}>
			<Card setShowDetail={setShowDetail} />
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
}

export default List;
