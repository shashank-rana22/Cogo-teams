import Filter from '../Filters';

import styles from './styles.module.css';

function Header({ setFilters = () => {}, filters = {} }) {
	return (
		<div className={styles.header_container}>

			<Filter setFilters={setFilters} filters={filters} activeTab={filters.type} />
		</div>
	);
}

export default Header;
