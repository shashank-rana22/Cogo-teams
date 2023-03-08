import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function Filters(props) {
	const {
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	return (
		<section className={styles.container} id="filters">
			<div className={styles.search_container}>
				<SearchInput
					size="md"
					placeholder="Search"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
				/>
			</div>
		</section>
	);
}

export default Filters;
