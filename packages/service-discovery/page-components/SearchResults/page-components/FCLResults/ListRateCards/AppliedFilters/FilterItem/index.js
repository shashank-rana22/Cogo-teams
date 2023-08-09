import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { FILTERS_DEFAULT_VALUES } from '../../../../../common/Filters/FilterContent/extra-filter-controls';

import styles from './styles.module.css';

const getLabel = (key, value) => {
	const formattedValue = startCase(value);

	if (key === 'schedule_type') {
		return `${formattedValue}-Shipment`;
	}

	if (key === 'offers') {
		return `Offers-${formattedValue}`;
	}

	return formattedValue;
};

function FilterItem({ item = [], setFilters = () => {} }) {
	const [key, value] = item;

	const notGoingToShow = typeof value === 'object' || !value
		|| !Object.keys(FILTERS_DEFAULT_VALUES).includes(key);

	const label = getLabel(key, value);

	const handleRemove = () => {
		setFilters((prev) => ({
			...prev,
			[key]: FILTERS_DEFAULT_VALUES[key],
		}));
	};

	if (notGoingToShow || !label) return null;

	return (
		<div className={styles.container}>
			<span className={styles.label}>{label}</span>

			<div className={styles.icon_container}>
				<IcMCross className={styles.cross_icon} onClick={handleRemove} />
			</div>
		</div>
	);
}

export default FilterItem;
