import { AsyncSelectController, useForm } from '@cogoport/forms';
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

function LocationSelect() {
	const { control } = useForm({});

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
				/>
			</div>
		</div>
	);
}

export default LocationSelect;
