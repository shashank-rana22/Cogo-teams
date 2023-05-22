import FilterType from '../../../common/FilterType';

import styles from './styles.module.css';

function FilterTicketsSection() {
	return (
		<div className={styles.ticket_section_container}>
			<FilterType />
		</div>
	);
}

export default FilterTicketsSection;
