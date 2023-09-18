import { cl } from '@cogoport/components';

import options from '../../../configurations/get-period-filter-options';

import styles from './styles.module.css';

function FilterContent(props) {
	const {
		period,
		setPeriod,
		setShowFilters,
	} = props;

	return (
		options.map((item) => (
			<div
				className={cl`${styles.item} ${
					period === item.value ? styles.selected : ''
				}`}
				onClick={() => {
					setPeriod(item.value);
					setShowFilters(false);
				}}
				role="presentation"
				key={item.value}
			>
				{item.label}
			</div>
		))
	);
}

export default FilterContent;
