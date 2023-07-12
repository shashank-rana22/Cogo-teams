import { Input, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function PortForm({ isFirst, isLast, port, diffInDays, index, onClickDelete }) {
	const [port_name, setPortName] = useState('');
	const [days, setDays] = useState('');
	const options = useGetAsyncOptions(
		merge(asyncFieldsLocations()),
	);
	const submit = { port_name, days };
	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div>
					<div className={styles.eta_etd} />

				</div>

			</div>
			{ !isFirst ? <div className={styles.add_icon}><IcMPlusInCircle /></div> : <div style={{ margin: '7px' }} />}
			<div className={styles.middle}>
				{!isFirst ? <div className={styles.hr_line_up} /> : null}
				<div className={styles.circle} />
				{!isLast ? <div className={styles.hr_line_down} /> : null}
			</div>
			<div className={styles.right}>
				<div className={styles.port_input}>
					<Select
						placeholder="Port Name"
						{...options}
						onChange={(value) => (setPortName(value))}
						value={port_name}
					/>
					<IcMDelete height="20px" width="20px" margin="40px" onClick={() => { onClickDelete(index); }} />
				</div>
				<div className={styles.days}>
					<Input placeholder="Days" value={days} onChange={(value) => (setDays(value))} />
				</div>

				
			</div>
		</div>
	);
}
export default PortForm;
