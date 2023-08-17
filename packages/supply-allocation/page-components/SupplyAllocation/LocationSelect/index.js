import { Button } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import { IcMPortArrow } from '@cogoport/icons-react';
import { useState } from 'react';

import RenderLabelNew from '../../../commons/RenderLabelNew';
import StyledSelect from '../../../commons/StyledSelect';

import styles from './styles.module.css';

const OBJECT_OPTIONS = {
	all                : 'All Regions',
	is_bookmarked      : 'Your Favorites',
	attention_required : 'Attention Required',
};

const DEFAULT_PAGE = 1;

const commonLocationProps = {
	asyncKey : 'list_locations',
	params   : {
		filters: {
			type: 'seaport',
		},
		page_limit : 10,
		sort_by    : 'name',
		sort_type  : 'asc',
		includes   : { default_params_required: true },
	},
	labelKey    : 'display_name',
	renderLabel : (item) => <RenderLabelNew data={item} />,
	initialCall : true,
	placeholder : 'Search via port name/code...',
};

function LocationSelect({
	control = {},
	createSupplySearch = () => { },
	locationDetails = {},
	setLocationDetails = () => { },
	setFilters = () => {},
	setPagination = () => {},
}) {
	const onClickAllocate = () => {
		const payload = { ...locationDetails };
		createSupplySearch({ payload });
	};

	const [region, setRegion] = useState('all');

	return (
		<div className={styles.location_container}>

			<div className={styles.select_controller}>
				<div className={styles.location_label}>Origin Port</div>
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
				<div className={styles.location_label}>Destination Port</div>
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

			<div style={{ width: 150, display: 'flex', alignItems: 'flex-end', marginTop: '36px' }}>
				<StyledSelect
					defaultValue={region}
					onChange={({ selectedValue }) => {
						setRegion(selectedValue);
					}}
					size="sm"
					options={OBJECT_OPTIONS}
				/>
			</div>

			<div className={styles.port_arrow_icon}>
				<Button onClick={() => onClickAllocate()} themeType="accent">+ Allocation</Button>
			</div>

		</div>
	);
}

export default LocationSelect;
