import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFtick } from '@cogoport/icons-react';
import { isEmpty, isSameDay } from '@cogoport/utils';

import { FILTERS_DEFAULT_VALUES } from './filter-controls';
import FilterModal from './FilterModal';
import styles from './styles.module.css';

const checkIfFiltersChanged = (defaultValues, finalValues) => {
	let isApplied = false;

	Object.entries(defaultValues).forEach(([key, value]) => {
		if (key === 'cargo_readiness_date') {
			if (value && finalValues[key] && !isSameDay(value, finalValues[key])) {
				isApplied = true;
			}
		} else if (key === 'airline_id') {
			if (!isEmpty(finalValues[key])) {
				isApplied = true;
			}
		} else if ((value && !finalValues[key] && key in finalValues) || (!value && finalValues[key] && key)
		|| (value && finalValues[key] && value !== finalValues[key])) {
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
}) {
	const filtersApplied = checkIfFiltersChanged(FILTERS_DEFAULT_VALUES, filters);

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
					showFiltersOnly
					loading={loading}
					DEFAULT_VALUES={FILTERS_DEFAULT_VALUES}
					openAccordian={openAccordian}
				/>
			) : null}
		</div>
	);
}

export default Filters;
