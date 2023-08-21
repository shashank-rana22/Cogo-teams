import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters/index.tsx';
import { invoiceFilters } from '../../../configurations/index';
import FilterModal from '../../../MoreFilters/index';

import styles from './styles.module.css';

function FilterContainers() {
	const [filters, setFilters] = useState('');
	return (
		<div className={styles.filters}>
			<div className={styles.filtercontainer}>
				<Filter controls={invoiceFilters} filters={filters} setFilters={setFilters} />
				<FilterModal filters={filters} setFilters={setFilters} filterLength={5} />
			</div>

			<div className={styles.search_filter}>
				<div className={styles.search}>
					<Input
						name="search"
						size="sm"
						value={filters?.search || ''}
						onChange={(val) => setFilters((prevFilters) => ({
							...prevFilters,
							search    : val,
							pageIndex : 1,
						}))}
						placeholder="Search By Name/Invoice Number/Sid"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchdark height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default FilterContainers;
