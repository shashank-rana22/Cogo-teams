import CategoryType from './CategoryType';
import SearchType from './SearchType';
import styles from './styles.module.css';

function FilterType(props) {
	return (
		<div className={styles.filter_container}>
			<SearchType {...props} />
			<CategoryType />
		</div>
	);
}

export default FilterType;
