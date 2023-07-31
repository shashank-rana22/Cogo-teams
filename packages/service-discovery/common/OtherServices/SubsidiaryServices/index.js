import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';
import React, { useState, useEffect, useMemo } from 'react';

import getAddedServices from './getAddedServices';
import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

const POPULAR_OPTIONS_COUNT = 10;

const slice = (array, count) => array.slice(GLOBAL_CONSTANTS.zeroth_index, count);

function SubsidiaryServices({
	possible_subsidiary_services = [],
	data = {},
	refetch = () => {},
	checkout_id = '',
	loading = false,
	...rest
}) {
	const [searchValue, setSearchValue] = useState('');
	const [disabled, setIsDisabled] = useState('');

	const addedOptions = getAddedServices(data.service_details || {});

	const SUBSIDIARY_OPTIONS = [];

	(possible_subsidiary_services || []).forEach((item) => {
		let tradeType = '';
		if (item?.trade_type === 'export') {
			tradeType = 'Origin';
		} else if (item?.trade_type === 'import') {
			tradeType = 'Destination';
		}
		const service = {
			label : `${tradeType} ${startCase(item?.name)}`,
			value : item?.key,
			code  : item.code,
		};
		SUBSIDIARY_OPTIONS.push(service);
	});

	const mostPopularArray = slice(SUBSIDIARY_OPTIONS, POPULAR_OPTIONS_COUNT);
	const [popularServices, setPopularServices] = useState(mostPopularArray);

	const removeSelectedOptions = (array) => {
		const finalArray = array.filter((item) => !addedOptions.some(
			(selectedItem) => selectedItem.value === item.value,
		));
		return finalArray;
	};

	useEffect(() => {
		let searchArray = [];
		if (!searchValue) {
			searchArray = removeSelectedOptions(mostPopularArray);
		} else {
			searchArray = SUBSIDIARY_OPTIONS.filter(
				(serviceItem) => serviceItem.value.includes(startCase(searchValue))
				|| serviceItem.label.includes(startCase(searchValue))
				|| serviceItem.code.includes(upperCase(searchValue)),
			);
			searchArray = removeSelectedOptions(searchArray);
		}
		setPopularServices(searchArray);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	function InputSuffix() {
		return (
			<div className={styles.suffix_container}>
				{searchValue ? (
					<IcMCross
						width={20}
						height={20}
						className={styles.cross}
						onClick={() => setSearchValue('')}
					/>
				) : null}

				<IcMSearchlight
					width={20}
					height={20}
					className={styles.input_suffix}
				/>
			</div>
		);
	}

	const servicesToShow = useMemo(
		() => [...addedOptions, ...popularServices],
		[addedOptions, popularServices],
	);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Looking for smaller services? Check out our subsidiary services -
			</div>

			<div className={styles.select_container}>
				<div className={styles.label}>Search Subsidiary Services</div>

				<Input
					suffix={<InputSuffix />}
					value={searchValue}
					onChange={(val) => setSearchValue(val)}
					size={rest.size || 'md'}
					placeholder="Eg. - Origin Entry Summary Declaration"
				/>
			</div>

			<div className={styles.most_popular_container}>
				<div className={styles.label}>Our most popular services</div>

				<div key={loading} className={styles.wrapper}>
					{isEmpty(servicesToShow) ? (
						<strong>Nothing to show here</strong>
					) : (servicesToShow || []).map((item) => (
						<ServiceItem
							data={data}
							itemData={item}
							key={`${item.label}_${item.value}`}
							selectedServices={addedOptions}
							popularServices={popularServices}
							setPopularServices={setPopularServices}
							possible_subsidiary_services={possible_subsidiary_services}
							refetch={refetch}
							setIsDisabled={setIsDisabled}
							disabled={disabled && item.value !== disabled}
							checkout_id={checkout_id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default SubsidiaryServices;
