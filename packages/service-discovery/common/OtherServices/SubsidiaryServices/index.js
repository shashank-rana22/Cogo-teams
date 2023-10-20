import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import SearchInput from '../../SearchInput';

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
}) {
	const [searchValue, setSearchValue] = useState('');
	const [disabled, setIsDisabled] = useState('');

	const added_services = useMemo(() => Object.values(data?.service_details || {})
		.filter((serviceItem) => serviceItem.service_type === 'subsidiary'), [data]);

	const SUBSIDIARY_OPTIONS = [];

	(possible_subsidiary_services || []).forEach((item) => {
		let tradeType = '';
		if (item?.trade_type === 'export') {
			tradeType = 'Origin';
		} else if (item?.trade_type === 'import') {
			tradeType = 'Destination';
		}

		const formattedName = startCase(item?.name);

		const service = {
			label   : `${tradeType} ${formattedName}`,
			value   : item?.key,
			code    : item.code,
			service : item.service,
		};
		SUBSIDIARY_OPTIONS.push(service);
	});

	const mostPopularArray = slice(SUBSIDIARY_OPTIONS, POPULAR_OPTIONS_COUNT);
	const [popularServices, setPopularServices] = useState(mostPopularArray);

	const removeSelectedOptions = (array) => {
		const finalArray = array.filter((item) => !added_services.some(
			(selectedItem) => `${selectedItem.code}_${selectedItem.service}_${selectedItem.trade_type}` === item.value,
		));
		return slice(finalArray, POPULAR_OPTIONS_COUNT);
	};

	useEffect(() => {
		let searchArray = SUBSIDIARY_OPTIONS;

		if (!searchValue) {
			searchArray = removeSelectedOptions(searchArray);
		} else {
			const transformedSearchValue = searchValue?.toLowerCase();

			searchArray = SUBSIDIARY_OPTIONS.filter(
				(serviceItem) => serviceItem.value.toLowerCase()?.includes(transformedSearchValue)
				|| serviceItem.label.toLowerCase()?.includes(transformedSearchValue)
				|| serviceItem.code.toLowerCase()?.includes(transformedSearchValue),
			);
			searchArray = removeSelectedOptions(searchArray);
		}
		setPopularServices(removeSelectedOptions(searchArray));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, added_services]);

	const servicesToShow = useMemo(() => [...popularServices], [popularServices]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Looking for smaller services? Check out our subsidiary services -
			</div>

			<div className={styles.select_container}>
				<div className={styles.label}>Search Subsidiary Services</div>

				<SearchInput
					value={searchValue}
					onSearch={setSearchValue}
					placeholder={`Eg. - ${possible_subsidiary_services?.[GLOBAL_CONSTANTS.zeroth_index]?.name}`}
					showPrefix={false}
					onReset={() => setSearchValue('')}
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
