import { Button, Select } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useState } from 'react';

import ListLocations from '../../../commons/RenderLabels/ListLocations';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'All Regions',
		value : 'all',
	},
	{
		label : 'BookMarked',
		value : 'is_bookmarked',
	},
	{
		label : 'Attention Required',
		value : 'attention_required',
	},
];

const DEFAULT_PAGE = 1;

const commonLocationProps = {
	asyncKey : 'list_locations',
	params   : {
		filters: {
			type: ['seaport', 'country', 'continent'],
		},
		page_limit : 10,
		sort_by    : 'name',
		sort_type  : 'asc',
		includes   : { default_params_required: true },
	},
	labelKey    : 'display_name',
	renderLabel : (item) => <ListLocations data={item} />,
	initialCall : true,
	placeholder : 'Search via port name/code...',
};

function LocationSelect({
	control = {},
	createSupplySearch = () => {},
	locationDetails = {},
	setLocationDetails = () => {},
	setFilters = () => {},
	setPagination = () => {},
	listLoading = false,
	createSearchLoadng = false,
}) {
	const onClickAllocate = () => {
		const payload = { ...locationDetails };
		createSupplySearch({ payload });
	};

	const [region, setRegion] = useState('all');

	return (
		<div className={styles.container}>
			<div className={styles.location_container}>
				<div className={styles.select_controller}>
					<div className={styles.location_label}>Origin </div>
					<AsyncSelectController
						name="origin_location_id"
						control={control}
						isClearable
						label="Select Origin SeaPort"
						{...commonLocationProps}
						onChange={(id, item) => {
							setLocationDetails((prev) => ({
								...prev,
								origin_location_id   : id,
								origin_location_type : item?.type,
							}));

							setFilters((prev) => ({
								...prev,
								origin_location_id: id || undefined,
							}));

							setPagination(DEFAULT_PAGE);
						}}
					/>
				</div>

				<div className={styles.port_arrow_icon}>
					<IcMPortArrow width={30} height={30} />
				</div>

				<div className={styles.select_controller}>
					<div className={styles.location_label}>Destination </div>
					<AsyncSelectController
						name="destination_location_id"
						control={control}
						isClearable
						label="Select Origin SeaPort"
						{...commonLocationProps}
						onChange={(id, item) => {
							setLocationDetails((prev) => ({
								...prev,
								destination_location_id   : id,
								destination_location_type : item?.type,
							}));
							setFilters((prev) => ({
								...prev,
								destination_location_id: id || undefined,
							}));
							setPagination(DEFAULT_PAGE);
						}}
					/>
				</div>
			</div>

			<div style={{ display: 'flex', marginTop: '30px' }}>
				<div className={styles.select_container}>
					<Select
						size="md"
						options={OPTIONS}
						value={region}
						onChange={(selectedValue) => {
							setRegion(selectedValue);
							setFilters((prev) => {
								const filterValues = {
									is_bookmarked: {
										is_bookmarked         : true,
										is_attention_required : undefined,
									},
									attention_required: {
										is_bookmarked         : undefined,
										is_attention_required : true,
									},
									all: {
										is_bookmarked         : undefined,
										is_attention_required : undefined,
									},
								};

								return {
									...prev,
									...(filterValues[selectedValue] || {}),
								};
							});
							setPagination(DEFAULT_PAGE);
						}}
					/>
				</div>

				<div className={styles.port_arrow_icon}>
					<Button
						onClick={() => onClickAllocate()}
						themeType="accent"
						disabled={listLoading}
						loading={createSearchLoadng}
						size="lg"
					>
						+ Allocation
					</Button>
				</div>

			</div>
		</div>
	);
}

export default LocationSelect;
