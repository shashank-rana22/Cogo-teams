import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { FILTERS_DEFAULT_VALUES } from '../../Filters/FilterContent/extra-filter-controls';

import styles from './styles.module.css';

const getLabel = (key, value) => {
	const formattedValue = startCase(value);

	if (key === 'schedule_type') {
		return `${formattedValue}-Shipment`;
	}

	if (key === 'offers') {
		return `Offers-${formattedValue}`;
	}

	if (key === 'shipping_line_id') {
		return 'Preferred shipping line(s)';
	}

	return formattedValue;
};

function FilterItem({
	item = [],
	setFilters = () => {},
	setOpenAccordian = () => {},
	setShowFilterModal = () => {},
}) {
	const [key, value] = item;

	const notGoingToShow = !value || isEmpty(value) || !Object.keys(FILTERS_DEFAULT_VALUES).includes(key);

	const label = getLabel(key, value);

	const handleRemove = () => {
		setFilters((prev) => ({
			...prev,
			[key]: FILTERS_DEFAULT_VALUES[key],
		}));
	};

	const onClickLabel = () => {
		setShowFilterModal(true);
		setOpenAccordian(key);
	};

	if (notGoingToShow || !label) return null;

	return (
		<div className={styles.container}>
			<span
				role="presentation"
				className={styles.label}
				onClick={onClickLabel}
			>
				{label}
			</span>

			<div className={styles.icon_container}>
				<IcMCross className={styles.cross_icon} onClick={handleRemove} />
			</div>
		</div>
	);
}

export default FilterItem;
