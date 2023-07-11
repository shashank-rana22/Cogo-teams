import {  Input } from '@cogoport/components';
import {IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';


import styles from './styles.module.css';

function PortForm({ isFirst, isLast, port, diffInDays, onClickDelete }) {

	return (
		<div className={styles.route_port}>
			<div className={styles.left}>
				<div>
					<div className={styles.eta_etd}>
					</div>

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
					<Input
						placeholder="Type here .."
					/>
					<IcMDelete height="20px" width="20px" margin="40px" onClick={() => { onClickDelete(); }} />
				</div>
				<div className={styles.days}>
					<Input placeholder="Days" />
				</div>

				
			</div>
		</div>
	);
}
export default PortForm;
