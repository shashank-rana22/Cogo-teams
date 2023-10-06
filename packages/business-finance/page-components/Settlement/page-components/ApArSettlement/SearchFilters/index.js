import { Input, Select } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getDocTypeOptions } from '../../../configurations/ap-ar-settlement/docType-options';
import { statusOptionsPayment, statusOptionsInvoice } from '../../../configurations/ap-ar-settlement/status-options';

import styles from './styles.module.css';

export function SearchFilters({
	filters = {},
	onFiltersChange = () => {},
	loading = false,
	jvSearch = '',
	setJvSearch = () => {},
}) {
	const { t = () => {} } = useTranslation(['settlement']);
	const handleFilterChange = (filterName = '', value = '') => {
		onFiltersChange(filterName, value);
	};

	return (
		<div className={styles.docFilter}>
			<div className={styles.flex}>
				<div>
					<Select
						value={filters?.docType}
						onChange={(e) => handleFilterChange('docType', e)}
						placeholder={t('settlement:doc_type_placeholder') || ''}
						options={getDocTypeOptions({ t })}
						size="sm"
						className={styles.common}
						isClearable
						disabled={loading}
					/>
				</div>

				{
				(filters?.docType && filters?.docType !== 'TDS')

				&& ((filters?.docType === 'PAYMENT' || filters?.docType === 'CREDIT_NOTE')
					? (
						<div className={styles.statusMargin}>
							<Select
								value={filters?.status}
								onChange={(e) => handleFilterChange('status', e)}
								placeholder={t('settlement:status_placeholder') || ''}
								options={statusOptionsPayment({ t })}
								size="sm"
								className={styles.common}
								isClearable
								disabled={loading}
							/>
						</div>
					) : (
						<div className={styles.statusMargin}>
							<Select
								value={filters?.status}
								onChange={(e) => handleFilterChange('status', e)}
								placeholder={t('settlement:status_placeholder') || ''}
								options={statusOptionsInvoice({ t })}
								size="sm"
								className={styles.common}
								isClearable
								disabled={loading}
							/>
						</div>
					))

			}
			</div>

			<div className={styles.inputwidth}>
				<Input
					name="search"
					size="sm"
					value={jvSearch || filters?.search || ''}
					onChange={(e) => { setJvSearch(''); handleFilterChange('search', e); }}
					placeholder={t('settlement:search_placeholder') || ''}
				/>
			</div>
		</div>
	);
}
