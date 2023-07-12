import { Button } from '@cogoport/components';
import React, { useState } from 'react';

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
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/image_228.svg"
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
