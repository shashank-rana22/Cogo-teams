import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFtick } from '@cogoport/icons-react';
import { isEmpty, isSameDay } from '@cogoport/utils';
import { useState } from 'react';

import FilterModal from './FilterModal';
import getControls from './getControls';
import styles from './styles.module.css';

const checkIfFiltersChanged = (defaultValues, finalValues) => {
	let isApplied = false;

	Object.entries(defaultValues).forEach(([key, value]) => {
		if (['shipping_line_id', 'airline_id'].includes(key)) {
			if (!isEmpty(finalValues[key])) {
				isApplied = true;
			}
		} else if (key === 'cargo_readiness_date') {
			if (value && finalValues[key] && !isSameDay(value, finalValues[key])) {
				isApplied = true;
			}
		} else if (key in finalValues && (value !== finalValues[key])
		&& JSON.stringify(value) !== JSON.stringify(finalValues[key])) {
			isApplied = true;
		}
	});

	return isApplied;
};

function Filters({
	data = {},
	filters = {},
	setFilters = () => {},
	loading = false,
	openAccordian = '',
	setOpenAccordian = () => {},
	showFilterModal = false,
	setShowFilterModal = () => {},
	airlines = [],
	// transitTime = {},
	setScheduleLoading = () => {},
}) {
	const [airlineParams, setAirlineParams] = useState({
		filters: {
			id: airlines,
		},
	});

	const { service_type = '', spot_search_id = '' } = data;

	const { controls = [], defaultValues = {} } = getControls({
		service_type,
		spot_search_id,
		airlines,
		airlineParams,
		setAirlineParams,
		// transitTime,
	});

	const filtersApplied = checkIfFiltersChanged(defaultValues, filters);

	const onClickButton = () => {
		setShowFilterModal(true);
		setOpenAccordian('');
	};

	return (
		<div className={styles.container}>
			<Button
				type="button"
				size="lg"
				themeType="link"
				onClick={onClickButton}
				className={styles.filter_button}
				disabled={isEmpty(data)}
			>
				<img
					src={GLOBAL_CONSTANTS.image_url.filter_icon}
					alt="filter-icon"
					width={20}
					height={20}
					style={{ marginRight: 12 }}
				/>
				Filters
				{filtersApplied ? <IcMFtick className={styles.tick_icon} /> : null}
			</Button>

			{showFilterModal ? (
				<FilterModal
					show={showFilterModal}
					setShow={setShowFilterModal}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					openAccordian={openAccordian}
					airlines={airlines}
					defaultValues={defaultValues}
					controls={controls}
					setScheduleLoading={setScheduleLoading}
				/>
			) : null}
		</div>
	);
}

export default Filters;
