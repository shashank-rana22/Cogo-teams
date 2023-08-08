import { Button } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import { IcMPortArrow } from '@cogoport/icons-react';

import RenderLabelNew from '../../../commons/RenderLabelNew';

import styles from './styles.module.css';

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

function LocationSelect({ control, createSupplySearch, locationDetails, setLocationDetails }) {
	const onClickAllocate = () => {
		const payload = { ...locationDetails };
		createSupplySearch({ payload });
	};

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
					}}
				/>
			</div>

			<div className={styles.port_arrow_icon}>
				<Button onClick={() => onClickAllocate()} themeType="accent">+ Allocation</Button>
			</div>
		</div>
	);
}

export default LocationSelect;
