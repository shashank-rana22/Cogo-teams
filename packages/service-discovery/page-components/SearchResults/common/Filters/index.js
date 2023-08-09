import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

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

function Filters({ data = {}, filters = {}, setFilters = () => {}, loading = false }) {
	const [showFilterModal, setShowFilterModal] = useState(false);

	const controls = getFilterControls(data, SERVICE_KEY, false, true);

	const DEFAULT_VALUES = getDefaultValues(controls);

	const filtersApplied = checkIfFiltersChanged(DEFAULT_VALUES, filters);

	return (
		<div className={styles.container}>
			<Button
				type="button"
				size="lg"
				themeType="link"
				onClick={() => setShowFilterModal(true)}
				className={styles.filter_button}
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
				/>
			) : null}
		</div>
	);
}

export default Filters;
