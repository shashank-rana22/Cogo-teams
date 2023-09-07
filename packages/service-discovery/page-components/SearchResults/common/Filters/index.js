import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { FILTERS_DEFAULT_VALUES } from './FilterContent/extra-filter-controls';
import getFilterControls from './FilterContent/getControls';
import FilterModal from './FilterModal';
import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

const getDefaultValues = (controls) => Object.values(controls).reduce((acc, controlObj) => (
	{ ...acc, [controlObj.name]: FILTERS_DEFAULT_VALUES[controlObj.name] }), {});

const checkIfFiltersChanged = (defaultValues, finalValues) => {
	let isApplied = false;

	Object.entries(defaultValues).forEach(([key, value]) => {
		if (key === 'shipping_line_id') {
			if (!isEmpty(finalValues[key])) {
				isApplied = true;
			}
		} else if ((value && !finalValues[key]) || (!value && finalValues[key])
		|| (value && value !== finalValues[key])) {
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
	const controls = getFilterControls({ data, service_key: SERVICE_KEY });

	const DEFAULT_VALUES = getDefaultValues(controls);

	const filtersApplied = checkIfFiltersChanged(DEFAULT_VALUES, filters);

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
					DEFAULT_VALUES={DEFAULT_VALUES}
					controls={controls}
					openAccordian={openAccordian}
				/>
			) : null}
		</div>
	);
}

export default Filters;
