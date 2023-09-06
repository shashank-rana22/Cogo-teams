import { Input, Select } from '@cogoport/components';
import React from 'react';

import { DOC_TYPE_OPTIONS } from '../../../configurations/ap-ar-settlement/docType-options';
import { STATUS_OPTIONS } from '../../../configurations/ap-ar-settlement/status-options';

import styles from './styles.module.css';

export function SearchFilters({
	filters = [],
	onFiltersChange = () => {},
	loading = false,
}) {
	const handleFilterChange = (filterName, value) => {
		onFiltersChange(filterName, value);
	};

	return (
		<div className={styles.docFilter}>
			<div className={styles.flex}>
				<div>
					<Select
						value={filters?.docType}
						onChange={(e) => handleFilterChange('docType', e)}
						placeholder="Document Type"
						options={DOC_TYPE_OPTIONS}
						size="sm"
						style={{ width: '250px', marginTop: '16px', marginBottom: '16px' }}
						isClearable
						disabled={loading}
					/>
				</div>

				{filters?.docType
				&& (
					<div style={{ marginLeft: '20px' }}>
						<Select
							value={filters?.status}
							onChange={(e) => handleFilterChange('status', e)}
							placeholder="Status"
							options={STATUS_OPTIONS}
							size="sm"
							style={{ width: '250px', marginTop: '16px', marginBottom: '16px' }}
							isClearable
							disabled={loading}
						/>
					</div>
				)}
			</div>

			<div className={styles.inputwidth}>
				<Input
					name="search"
					size="sm"
					value={filters?.search || ''}
					onChange={(e) => handleFilterChange('search', e)}
					placeholder="Search By Document Number"
				/>
			</div>
		</div>
	);
}
