import { Input, Select } from '@cogoport/components';
import React from 'react';

// import EmptyState from '../../../commons/EmptyState';
import { docTypeOptions } from '../../../configurations/ap-ar-settlement/docType-options';
import { statusOptions } from '../../../configurations/ap-ar-settlement/status-options';
// import Amount from '../Amount';

import styles from './styles.module.css';

export function SearchFilters({ filters = [], onFiltersChange = {}, loading = false }) {
	// const handleDocTypeChange = (value) => {
	// 	onDocTypeChange(value);
	// 	console.log(value);
	// };
	const handleFilterChange = (filterName, value) => {
		onFiltersChange(filterName, value);
	};
	return (
		<>
			<div className={styles.docFilter}>
				<div>
					<Select
						value={filters?.docType}
						onChange={(e) => handleFilterChange('docType', e)}
						placeholder="Document Type"
						options={docTypeOptions}
						size="sm"
						style={{ width: '250px', marginTop: '16px', marginBottom: '16px' }}
						isClearable
						disabled={loading}
					/>
				</div>
				{filters?.docType
				&& (
					<div style={{ marginRight: '500px' }}>
						<Select
							value={filters?.status}
							onChange={(e) => handleFilterChange('status', e)}
							placeholder="Status"
							options={statusOptions}
							size="sm"
							style={{ width: '250px', marginTop: '16px', marginBottom: '16px' }}
							isClearable
							disabled={loading}
						/>
					</div>
				)}
				<div className={styles.inputwidth}>
					<Input
						name="search"
						size="sm"
						value={filters?.query || ''}
						onChange={(e) => handleFilterChange('query', e)}
						placeholder="Search By Document Number"
						// disabled={loading}
					/>
				</div>
			</div>

			{/* <div className={styles.container}>
				<EmptyState height={315} width={482} />
			</div> */}

		</>
	);
}
