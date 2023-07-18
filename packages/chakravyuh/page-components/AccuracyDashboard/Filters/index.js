import { Button, Popover, Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMFcl, IcMLcl, IcMAir, IcMSearchlight, IcMPortArrow, IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FilterContainer from './FilterContainer';
import styles from './styles.module.css';

const OPTIONS = [
	{
		label : <p className={styles.dropdown_label}>FCL</p>,
		value : 'fcl',
	},
	{
		label : <p className={styles.dropdown_label}>LCL</p>,
		value : 'lcl',
	},
	{
		label : <p className={styles.dropdown_label}>AIR</p>,
		value : 'air',
	},
];

const SELECT_ICON_MAPPING = {
	fcl : <IcMFcl />,
	lcl : <IcMLcl />,
	air : <IcMAir />,
};
function Filters() {
	const [filtersData, setFilters] = useState({
		service_type : 'fcl',
		origin       : '',
		destination  : '',
	});

	const [showFiltersPopover, setShowFiltersPopover] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.service_type}>
				<p className={styles.title_label}>Service Type</p>
				<Select
					size="sm"
					isClearable={false}
					placeholder="Select here"
					value={filtersData?.service_type}
					options={OPTIONS}
					prefix={SELECT_ICON_MAPPING[filtersData?.service_type] || null}
					onChange={(value) => (
						setFilters((prev) => ({ ...prev, service_type: value }))
					)}
					className={styles.dropdown}
				/>
			</div>
			<div className={styles.location_filter_container}>
				<div className={styles.service_type}>
					<p className={styles.title_label}>Origin</p>
					<AsyncSelect
						asyncKey="organizations"
						initialCall={false}
						onChange={(value) => (
							setFilters((prev) => ({ ...prev, origin: value }))
						)}
						value={filtersData?.origin}
						placeholder="Port / Country"
						prefix={<IcMSearchlight className={styles.search_icon} />}
						size="sm"
						params={{
							filters: {
								account_type : 'hs_code_list',
								status       : 'active',
								kyc_status   : 'verified',
							},
						}}
						className={styles.location_select}
					/>
				</div>
				<div className={styles.service_type}><IcMPortArrow className={styles.port_arrow_icon} /></div>
				<div className={styles.service_type}>
					<p className={styles.title_label}>Destination</p>
					<AsyncSelect
						asyncKey="list_locations"
						initialCall={false}
						onChange={(value) => (
							setFilters((prev) => ({ ...prev, destination: value }))
						)}
						value={filtersData?.destination}
						placeholder="Port / Country"
						prefix={<IcMSearchlight className={styles.search_icon} />}
						size="sm"
						params={{
							filters: {
								is_icd: true,
							},
						}}
						className={styles.location_select}
					/>
				</div>
			</div>
			<div className={styles.filters_container}>
				<Popover
					render={<FilterContainer />}
					trigger="click"
					placement="bottom"
					visible={showFiltersPopover}
					onClickOutside={() => { setShowFiltersPopover(false); }}
					interactive
				>
					<Button
						id="dash-main-filters"
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
