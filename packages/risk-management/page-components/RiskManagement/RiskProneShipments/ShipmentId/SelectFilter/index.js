import { Select } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import React, { useState } from 'react';

import { optionsMap } from './constants';
import styles from './styles.module.css';

const OPTIONS = [
	// {
	// 	label : 'Customer Expertise',
	// 	value : 'customer_expertise',
	// },
	// {
	// 	label : 'Trade Expertise',
	// 	value : 'trade_expertise',
	// },
	// {
	// 	label : 'Commodity Expertise',
	// 	value : 'commodity_expertise',
	// },
	// {
	// 	label : 'Misc Expertise',
	// 	value : 'miscellaneous',
	// },
];

function SelectFilter({ filters, setFilters, activeTab }) {
	const OPTION = optionsMap[activeTab] || [];
	const { originValue, destinationValue, reason, hsCode } = filters || {};
	const [cargoValue, setCargoValue] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={styles.select}>
					<AsyncSelect
						name="from_port_id"
						size="sm"
						placeholder="Origin"
						asyncKey="list_locations"
						isClearable
						defaultOptions="true"
						value={originValue}
						onChange={(e) => setFilters({
							...filters,
							originValue: e || undefined,

						})}
						params={{
							filters: {
								type   : ['seaport', 'country'],
								status : 'active',
							},
						}}
					/>
				</div>
				<div className={styles.select}>
					<AsyncSelect
						name="to_port_id"
						asyncKey="list_locations"
						size="sm"
						isClearable
						placeholder="Destination"
						defaultOptions="true"
						value={destinationValue}
						onChange={(e) => setFilters({
							...filters,
							destinationValue: e || undefined,
						})}
						params={{
							filters: {
								type   : ['seaport', 'country'],
								status : 'active',
							},
						}}
					/>
				</div>

				<div className={styles.select}>
					<Select
						size="sm"
						isClearable={false}
						placeholder="Cargo Value"
						value={cargoValue}
						options={OPTIONS}
						onChange={(value) => (
							setCargoValue(value)
						)}
						className={styles.dropdown}
					/>
				</div>
			</div>
			<div className={styles.sub_container}>
				{/* <div className={styles.select}>
					<Select
						size="sm"
						isClearable={false}
						placeholder="Potential Charges"
						value={cargoValue}
						options={OPTIONS}
						onChange={(value) => (
							setCargoValue(value)
						)}
						className={styles.dropdown}
					/>
				</div> */}
				<div className={styles.select}>
					<Select
						size="sm"
						isClearable
						placeholder="Reason"
						value={reason}
						options={OPTION}
						onChange={(e) => setFilters({
							...filters,
							reason: e || undefined,
						})}
						className={styles.dropdown}
					/>
				</div>
				<div className={styles.select}>
					<AsyncSelect
						name="hsCodeId"
						asyncKey="hs_code_list"
						size="sm"
						isClearable
						placeholder="Commodity Type"
						defaultOptions="true"
						value={hsCode}
						onChange={(e) => setFilters({
							...filters,
							hsCode: e || undefined,
						})}
					/>
				</div>
			</div>
		</div>
	);
}

export default SelectFilter;
