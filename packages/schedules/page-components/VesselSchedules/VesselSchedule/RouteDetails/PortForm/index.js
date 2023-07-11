import { Datepicker, Select, Popover, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMPlusInCircle, IcMOverflowDot, IcMDelete } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import Layout from '../../../Layout';

import controls from './controls';
import styles from './styles.module.css';

function PortForm({
	isFirst, isLast, port, diffInDays = 4, index, onClickDelete,
}) {
	const [date, setDate] = useState(new Date());
	const new_controls = controls();
	const { handleSubmit, control, formState: { errors }, watch } = useForm();
	const formValues = watch();
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
								onChange={setDate}
								value={date}
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
								onChange={setDate}
								value={date}
							/>
						</div>
					</div>
					{!isLast ? <div style={{ 'margin-left': '160px' }}><IcMPlusInCircle /></div> : <div style={{ 'margin-left': '175px' }} />}
				</div>
			</div>
			<div className={styles.middle}>
				{!isFirst && <div className={styles.hr_line_up} />}
				<div className={styles.circle} />
				{!isLast && <div className={styles.hr_line_down} />}
			</div>
			<div className={styles.right}>
				<div className={styles.port_name_form}>

					<Layout fields={new_controls.port} control={control} errors={errors} />

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
