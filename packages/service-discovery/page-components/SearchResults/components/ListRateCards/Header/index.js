import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React from 'react';

import Currency from './CurrencyFilter';
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

				<Button
					type="button"
					size="lg"
					themeType="link"
					onClick={() => setShowFilterModal(true)}
					className={styles.filter_button}
				>
					<IcMFilter style={{ marginRight: 4 }} />
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
