import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import deepEqual from '../../../utils/deepEqual';
import getControls from '../../Filters/getControls';

import styles from './styles.module.css';

const SCHEDULE_TYPE_MAPPING = {
	transshipment : 'Trans-shipment',
	direct        : 'Direct-shipment',
};

const formattedDate = (date = '', format = 'dd-MMM-yy') => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date[format],
	formatType : 'date',
});

const getLabel = (key, value) => {
	if (key === 'cargo_readiness_date') {
		return `Cargo ready date - ${formattedDate(value)}`;
	}

	if (key === 'transit_time') {
		return `Transit Time - ${value?.[GLOBAL_CONSTANTS.zeroth_index]} to ${value?.[GLOBAL_CONSTANTS.one]} days`;
	}

	if (key === 'source') {
		if (value?.includes('predicted')) {
			const updatedValues = value?.filter((val) => val !== 'predicted');
			return startCase(updatedValues);
		}
		return startCase(value);
	}

	if (key === 'schedule_type') {
		return SCHEDULE_TYPE_MAPPING[value];
	}

	const formattedValue = startCase(value);

	if (!formattedValue) {
		return '';
	}

	if (key === 'offers') {
		return `Offers-${formattedValue}`;
	}

	if (key === 'shipping_line_id') {
		return 'Preferred shipping line(s)';
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
	service_type = '',
}) {
	const [key, value] = item;

	const { defaultValues = {} } = getControls({ service_type });

	const show = value && ((value instanceof Date) || !isEmpty(value))
				&& Object.keys(defaultValues).includes(key) && !deepEqual(defaultValues[key], value);

	const label = getLabel(key, value);

	const handleRemove = () => {
		setFilters((prev) => ({
			...prev,
			[key]: defaultValues[key],
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
