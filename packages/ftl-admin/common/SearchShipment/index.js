import { Input } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

/**
 *
 * @param {*} object
 * 	takes an object with property:
 * 	setFilters -> state setter,
 * 	keyName -> name of the key by which you want your searched shipments serial ids,
 * 	isMultiSelect -> can choose multiple serial ids which are comma(,) seperated,
 * 	lowerLabel -> lower label of the search bar,
 * 	upperLabel -> upper label of the search bar,
 * 	placeholder -> placeholder for search-bar
 *
 * @returns React Component
 */

const DEFAULT_PAGE = 1;

function SearchShipment({
	setFilters = () => {}, keyName = 'serial_ids',
	isMultiSelect = true, lowerLabel = '', placeholder = 'ex: 120045, 140032, ...',
	upperLabel = 'Select SIDs',
}) {
	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		let selectedShipments = query?.trim()?.split(',')?.map((item) => item?.trim()).filter((item) => item);
		if (!isMultiSelect) { [selectedShipments] = selectedShipments; }
		setFilters((prev) => ({
			...prev,
			[keyName] : !isEmpty(selectedShipments) ? selectedShipments : undefined,
			page      : DEFAULT_PAGE,
		}));
	}, [query, setFilters, keyName, isMultiSelect]);

	return (
		<div className={styles.search_shipment}>
			<div className={styles.search_sids}>
				<span>{upperLabel}</span>
				<Input
					size="sm"
					placeholder={placeholder}
					onChange={(e) => debounceQuery(e)}
				/>
				{lowerLabel && <span className={styles.lowerLabel}>{lowerLabel}</span>}
			</div>

		</div>
	);
}

export default SearchShipment;
