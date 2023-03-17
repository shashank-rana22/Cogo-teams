import { MultiSelect, Toggle } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsCogoEntities } from '@cogoport/forms/utils/getAsyncFields';
import { IcCCountryIndia, IcCCountryNetherland, IcCCountrySingapore } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const flagMapping = {
	101 : <IcCCountryIndia />,
	201 : <IcCCountryNetherland />,
	301 : <IcCCountryIndia />,
	401 : <IcCCountrySingapore />,
	501 : '',
};

function Header({ headerFilters, setHeaderFilters }) {
	const entityOptions = useGetAsyncOptions(merge(asyncFieldsCogoEntities()));

	const { currency, entity_code } = headerFilters;

	const handleFilters = (key, val) => {
		setHeaderFilters({
			...headerFilters,
			[key]: val,
		});
	};

	const formatedEntityOptions = entityOptions.options.map((val) => {
		const { entity_code : entity, business_name, ledger_currency } = val;
		return {
			label:
	<div>
		{entity}
		{' '}
		{flagMapping[entity]}
		{' '}
		{business_name}
		{' '}
		{ledger_currency}
	</div>,
			value: entity,
		};
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex_col}>
				<div className={styles.heading}>
					Unified Dashboard
				</div>
				<MultiSelect
					className={styles.dropdown}
					placeholder="Search by Cogo entity"
					defaultOptions
					isClearable
					onChange={(e) => handleFilters('entity_code', e)}
					value={entity_code}
					options={formatedEntityOptions}
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
