import Card from './Card';
import styles from './styles.module.css';

function List() {
	return (
		<div className={styles.container}>
			{[...Array(4).map((item) => <Card />)]}
		</div>
	);
}

export default List;
