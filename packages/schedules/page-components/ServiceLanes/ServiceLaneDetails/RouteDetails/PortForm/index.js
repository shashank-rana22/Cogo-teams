import { Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMDelete } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
function PortForm({
	index,
	onClickDelete,
	setSubmit,
	deletePort,
	route,
}) {
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
	let firstIndex = ZERO;
	let lastIndex = route.length - ONE;

	if (deletePort && (deletePort.includes(ZERO) || deletePort.includes(route.length - ONE))) {
		const allNumbers = new Set(Array.from({ length: route.length }, (_, i) => i));
		const missingNumbers = [...allNumbers].filter((num) => !deletePort.includes(num));
		firstIndex = deletePort.includes(ZERO) ? missingNumbers[ZERO] : ZERO;
		lastIndex = deletePort.includes(route.length - ONE)
			? missingNumbers[missingNumbers.length - ONE]
			: (route.length - ONE);
	}
	const isFirst = firstIndex === index;
	const isLast = lastIndex === index;
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>

				<div className={styles.days}>
					<Select
						options={DAY_OF_WEEK_OPTIONS}
						placeholder="ETA"
						value={eta_day_count}
						onChange={(value) => {
							setEta_day(value);
							setSubmit((prev) => ({ ...prev, eta_day_count: value }));
						}}
					/>
				</div>
				<div className={styles.days}>
					<Select
						options={DAY_OF_WEEK_OPTIONS}
						placeholder="ETD"
						value={etd_day_count}
						onChange={(value) => {
							setEtd_day(value);
							setSubmit((prev) => ({ ...prev, etd_day_count: value }));
						}}
					/>
				</div>
			</div>
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} /> }
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_input}>
					<Select
						placeholder="Port Name"
						{...options}
						onChange={(value) => {
							setLocation_id(value);
							setSubmit((prev) => ({ ...prev, location_id: value }));
						}}
						value={location_id}
					/>
					<IcMDelete
						className={styles.delete_icon}
						onClick={() => {
							onClickDelete(index);
						}}
					/>
				</div>

			</div>
		</div>
	);
}
export default PortForm;
