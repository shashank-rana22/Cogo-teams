import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import { FILTERS_DEFAULT_VALUES } from '../../../../../common/Filters/filter-controls';

import styles from './styles.module.css';

const formattedDate = (date = '', format = 'dd-MMM-yy') => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date[format],
	formatType : 'date',
});

const getLabel = (key, value) => {
	if (key === 'cargo_readiness_date') {
		return `Cargo ready date - ${formattedDate(value)}`;
	}

	const formattedValue = startCase(value);

	if (!formattedValue) {
		return '';
	}

	if (key === 'schedule_type') {
		return `${formattedValue}-Shipment`;
	}

	if (key === 'offers') {
		return `Offers-${formattedValue}`;
	}

	if (key === 'airline_id') {
		return 'Preferred airline(s)';
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

	const show = value && ((value instanceof Date) || !isEmpty(value))
				&& Object.keys(FILTERS_DEFAULT_VALUES).includes(key);

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

	if (!show || !label) return null;

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
