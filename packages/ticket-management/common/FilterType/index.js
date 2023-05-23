import CategoryType from './CategoryType';
import SearchType from './SearchType';
import styles from './styles.module.css';

function FilterType() {
	return (
		<div className={styles.filter_container}>
			<SearchType />
			<CategoryType />
		</div>
	);
}

export default FilterType;
