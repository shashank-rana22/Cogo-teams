import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import FilterModal from './FilterModal';
import styles from './styles.module.css';

function Filters({ data = {}, filters = {}, setFilters = () => {} }) {
	const [showFilterModal, setShowFilterModal] = useState(false);

	return (
		<>
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
			</Button>

			{showFilterModal ? (
				<FilterModal
					data={data}
					show={showFilterModal}
					setShow={setShowFilterModal}
					filters={filters}
					setFilters={setFilters}
					showFiltersOnly
				/>
			) : null}
		</>
	);
}

export default Filters;
