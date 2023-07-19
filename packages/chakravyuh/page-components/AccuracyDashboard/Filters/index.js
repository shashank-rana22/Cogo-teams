import { Button, Popover, Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import {
	SELECT_ICON_MAPPING,
	SERVICE_TYPE_OPTIONS,
	TIME_RANGE_OPTIONS,
} from '../../../constants/dashboard_filter_controls';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';

const CONSTANT_ONE = 1;

function Filters(props) {
	const { globalFilters = {}, setGlobalFilters = () => {} } = props;
	const { service_type, time_range, origin, destination } = globalFilters;
	const [showFiltersPopover, setShowFiltersPopover] = useState(false);
	const [popupKey, setPopupKey] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const changePrimaryFilters = (key, value) => {
		setGlobalFilters((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {
		setPopupKey((prev) => prev + CONSTANT_ONE);
	}, [service_type]);

	return (
		<div className={styles.container}>
			<div className={styles.service_type}>
				<p className={styles.title_label}>Service Type</p>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Select here"
					value={service_type}
					options={SERVICE_TYPE_OPTIONS}
					prefix={SELECT_ICON_MAPPING[service_type] || null}
					onChange={(value) => changePrimaryFilters('service_type', value)}
					className={styles.dropdown}
				/>
			</div>
			<div className={styles.location_filter_container}>
				<div className={styles.service_type}>
					<p className={styles.title_label}>Origin</p>
					<AsyncSelect
						asyncKey="list_locations"
						initialCall={false}
						onChange={(value) => changePrimaryFilters('origin', value)}
						value={origin}
						placeholder="Port / Country"
						prefix={<IcMSearchlight className={styles.search_icon} />}
						size="sm"
						params={{
							filters: {
								type: [
									`${service_type === 'fcl' ? 'seaport' : 'airport'}`,
									'country',
								],
							},
						}}
						isClearable
						className={styles.location_select}
					/>
				</div>
				<div className={styles.service_type}><IcMPortArrow className={styles.port_arrow_icon} /></div>
				<div className={styles.service_type}>
					<p className={styles.title_label}>Destination</p>
					<AsyncSelect
						asyncKey="list_locations"
						initialCall={false}
						onChange={(value) => changePrimaryFilters('destination', value)}
						value={destination}
						placeholder="Port / Country"
						prefix={<IcMSearchlight className={styles.search_icon} />}
						size="sm"
						params={{
							filters: {
								type: [
									`${service_type === 'fcl' ? 'seaport' : 'airport'}`,
									'country',
								],
							},
						}}
						isClearable
						className={styles.location_select}
					/>
				</div>
			</div>
			<div className={styles.service_type}>
				<p className={styles.title_label}>Time Range</p>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Select here"
					value={time_range}
					options={TIME_RANGE_OPTIONS}
					prefix={null}
					onChange={(value) => changePrimaryFilters('time_range', value)}
					className={styles.time_range_drop_down}
				/>
			</div>
			<div className={styles.filters_container}>
				<Popover
					key={popupKey}
					render={<FilterContainer {...props} />}
					trigger="click"
					placement="bottom"
					visible={showFiltersPopover}
					onClickOutside={() => { setShowFiltersPopover(false); }}
					interactive
				>
					<Button
						id="dash-main-globalFilters"
						themeType="secondary"
						onClick={() => setShowFiltersPopover(true)}
					>
						<IcMFilter className={styles.filter_icon} />
						<span className={styles.btn_label}>Filter</span>
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Filters;
