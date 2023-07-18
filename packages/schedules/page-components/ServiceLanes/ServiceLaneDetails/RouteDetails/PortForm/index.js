import { InputNumber, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function PortForm({ isFirst, isLast, port, diffInDays, index, onClickDelete, setSubmit }) {
	const [location_id, setLocation_id] = useState('');
	const [eta_day_count, setEta_day] = useState('');
	const [etd_day_count, setEtd_day] = useState('');
	const options = useGetAsyncOptions(
		merge(asyncFieldsLocations()),
	);
	const DAY_OF_WEEK_OPTIONS = [
		{ label: 'Monday', value: 2 },
		{ label: 'Tuesday', value: 3 },
		{ label: 'Wednesday', value: 4 },
		{ label: 'Thursday', value: 5 },
		{ label: 'Friday', value: 6 },
		{ label: 'Saturday', value: 7 },
		{ label: 'Sunday', value: 1 },
	];
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>

				<div className={styles.days}>
					<Select options={DAY_OF_WEEK_OPTIONS} placeholder="ETA" value={eta_day_count} onChange={(value) => { setEta_day(value); setSubmit((prev) => ({ ...prev, eta_day_count: value })); }} />
				</div>
				<div className={styles.days}>
					<Select options={DAY_OF_WEEK_OPTIONS} placeholder="ETD" value={etd_day_count} onChange={(value) => { setEtd_day(value); setSubmit((prev) => ({ ...prev, etd_day_count: value })); }} />
				</div>
			</div>
			{ !isFirst ? <div className={styles.add_icon}><IcMPlusInCircle /></div> : <div style={{ margin: '7px' }} />}
			<div className={styles.middle}>
				{!isFirst ? <div className={styles.hr_line_up} /> : null}
				<div className={styles.circle} />
				<div className={styles.hr_line_down} />
			</div>
			<div className={styles.right}>
				<div className={styles.port_input}>
					<Select
						placeholder="Port Name"
						{...options}
						onChange={(value) => { setLocation_id(value); setSubmit((prev) => ({ ...prev, location_id: value })); }}
						value={location_id}
					/>
					<IcMDelete height="20px" width="20px" margin="40px" onClick={() => { onClickDelete(index); }} />
				</div>

			</div>
		</div>
	);
}
export default PortForm;
