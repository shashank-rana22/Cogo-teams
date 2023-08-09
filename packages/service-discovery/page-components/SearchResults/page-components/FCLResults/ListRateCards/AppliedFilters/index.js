import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import FilterItem from './FilterItem';
import styles from './styles.module.css';

function AppliedFilters({
	filters = {},
	setFilters = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				{Object.entries(filters).map((item) => (
					<FilterItem
						key={item[GLOBAL_CONSTANTS.zeroth_index]}
						item={item}
						setFilters={setFilters}
					/>
				))}
			</div>
		</div>
	);
}

export default AppliedFilters;
