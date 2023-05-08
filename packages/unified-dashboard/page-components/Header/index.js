import { MultiSelect, Toggle } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncListCogoEntity } from '@cogoport/forms/utils/getAsyncFields';
import { IcCCountryIndia, IcCCountryNetherland, IcCCountrySingapore } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FLAG_MAPPING = {
	101 : <IcCCountryIndia />,
	201 : <IcCCountryNetherland />,
	301 : <IcCCountryIndia />,
	401 : <IcCCountrySingapore />,
	501 : '',
};

function Header({ headerFilters, setHeaderFilters }) {
	const entityOptions = useGetAsyncOptions(merge(asyncListCogoEntity()));

	const { currency, entity_code = [] } = headerFilters;

	const handleFilters = (key, val) => {
		setHeaderFilters({
			...headerFilters,
			[key]: val,
		});
	};

	const formatedEntityOptions = (option) => {
		const { entity_code : entity, business_name, ledger_currency } = option;
		return (
			<div>
				{entity}
				{' '}
				{FLAG_MAPPING[entity]}
				{' '}
				{business_name}
				{' '}
				(
				{ledger_currency}
				)
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.flex_col}>
				<div className={styles.heading}>
					Unified Dashboard
				</div>
				<MultiSelect
					className={styles.dropdown}
					placeholder="Search by Cogo entity"
					isClearable
					onChange={(e) => handleFilters('entity_code', e)}
					value={entity_code}
					{...entityOptions}
					renderLabel={(option) => formatedEntityOptions(option)}
				/>
			</div>
			<div>
				<div className={styles.flex_toggle}>
					<Toggle
						name="aa"
						onLabel="₹ (Rupees)"
						offLabel="$ (Dollar)"
						value={currency}
						onChange={(e) => handleFilters('currency', e.target.checked)}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
