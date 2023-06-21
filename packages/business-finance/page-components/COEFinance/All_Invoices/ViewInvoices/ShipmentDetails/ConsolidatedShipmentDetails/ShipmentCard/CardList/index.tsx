import Header from './CardHeader/index';
import CardItem from './Carditem/index';
import styles from './styles.module.css';

function List({
	fields,
	data = [],
	key,
}) {
	return (
		<main className={styles.main}>
			<Header fields={fields} />

			{(data || []).map((item) => (
				<CardItem
					key={item[key]}
					item={item}
					fields={fields}
				/>
			))}
		</main>
	);
}

export default List;
