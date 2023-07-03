import { Button } from '@cogoport/components';
import React from 'react';

import Currency from './CurrencyFilter';
import DetentionDemurrage from './D&D';
import Filters from './Filters';
import styles from './styles.module.css';

function Header({
	ratesData = [],
	details = {},
	filters = {},
	setFilters = () => {},
	showFilterModal = {},
	setShowFilterModal = () => {},
}) {
	const ratesCount = ratesData?.length || 0;

	return (
		<div className={styles.container}>
			<div className={styles.count}>{`${ratesCount} Results Found for your search`}</div>

			<div className={styles.filters_container}>
				<Currency
					filters={filters}
					setFilters={setFilters}
				/>

				<DetentionDemurrage />

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
			</div>

			{showFilterModal ? (
				<Filters
					data={details}
					show={showFilterModal}
					setShow={setShowFilterModal}
					filters={filters}
					setFilters={setFilters}
				/>
			) : null}

		</div>

	);
}

export default Header;
