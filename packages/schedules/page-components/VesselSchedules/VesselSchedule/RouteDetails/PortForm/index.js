import { Datepicker, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMDelete } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function PortForm({
	isFirst, isLast, port, diffInDays = 4, index, onClickDelete,
}) {
	const [arrival_date, setArrivalDate] = useState('');
	const [departure_date, setDepartureDate] = useState('');
	const [port_name, setPortName] = useState('');

	const options = useGetAsyncOptions(
		merge(asyncFieldsLocations()),
	);
	const submit = { port_name, arrival_date, departure_date };
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div className={styles.eta_etd_form}>
					<div className={styles.eta_form}>
						<div style={{ margin: '1px' }}>
							<Datepicker
								placeholder="Arrival Date"
								showTimeSelect
								dateFormat="MM/dd/yyyy HH:mm"
								name="date"
								onChange={setArrivalDate}
								value={arrival_date}
							/>
						</div>
					</div>
					<div className={styles.etd_form}>
						<div style={{ margin: '1px' }}>
							<Datepicker
								placeholder="Departure Date"
								showTimeSelect
								dateFormat="MM/dd/yyyy HH:mm"
								name="date"
								onChange={setDepartureDate}
								value={departure_date}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} />}
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_name_form}>
					<Select
						placeholder="Port Name"
						{...options}
						onChange={(value) => (setPortName(value))}
						value={port_name}

					/>
				</div>
				<IcMDelete style={{ cursor: 'pointer' }} height="20px" width="20px" margin="2px" onClick={() => { onClickDelete(index); }} />

				{!isLast && (
					<div className={styles.diff_in_days}>
						{diffInDays}
						{' '}
						Days
					</div>
				)}
			</div>
		</div>
	);
}
export default PortForm;
