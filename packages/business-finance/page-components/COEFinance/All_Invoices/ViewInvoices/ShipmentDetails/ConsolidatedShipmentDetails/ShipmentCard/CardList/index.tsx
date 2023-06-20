import Header from './CardHeader/index';
import CardItem from './Carditem/index';
import styles from './styles.module.css';

function List({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
}) {
	return (
		<main className={styles.main}>
			<Header fields={fields} showCode={showCode} />

			{(data || []).map((item) => (
				<CardItem
					key={item}
					item={item}
					loading={loading}
					fields={fields}
				/>
			))}
		</main>
	);
}

export default List;
