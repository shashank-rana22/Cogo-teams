import FilterType from '../../../common/FilterType';

import styles from './styles.module.css';
import TicketsSection from './TicketsSection';

function FilterTicketsSection() {
	return (
		<div className={styles.filter_tickets_container}>
			<FilterType />
			<TicketsSection />
		</div>
	);
}

export default FilterTicketsSection;
