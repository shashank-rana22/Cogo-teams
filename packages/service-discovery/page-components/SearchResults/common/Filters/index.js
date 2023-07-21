import { Button } from '@cogoport/components';
// import { IcMFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterModal from './FilterModal';
import styles from './styles.module.css';

function Filters({ data = {}, filters = {}, setFilters = () => {} }) {
	const [showFilterModal, setShowFilterModal] = useState(false);
	// const [filtersApplied, setFiltersApplied] = useState(false);

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
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_228.svg"
					alt="filter-icon"
					width={20}
					height={20}
					style={{ marginRight: 12 }}
				/>
				Filters
				{/* {filtersApplied && <IcMFtick width={20} height={20} fill="#ee3425" />} */}
			</Button>

			{showFilterModal ? (
				<FilterModal
					data={data}
					show={showFilterModal}
					setShow={setShowFilterModal}
					filters={filters}
					setFilters={setFilters}
					showFiltersOnly
					// setFiltersApplied={setFiltersApplied}
				/>
			) : null}
		</>
	);
}

export default Filters;
