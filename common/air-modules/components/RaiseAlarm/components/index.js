import { Button, Modal, Placeholder } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { useState } from 'react';

import RaiseAlarmModal from './RaiseAlarmModal';
import styles from './styles.module.css';

function RaiseAlarm({
	alarmId = '',
	setAlarmId = () => {},
	loading = false,
}) {
	const [show, setShow] = useState(false);

	if (loading) {
		<Placeholder
			width="140px"
			height="40px"
			style={{ borderRadius: '4px' }}
		/>;
	}

	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				style={{ marginRight: '65px' }}
				onClick={() => setShow(true)}
			>
				<IcCError width={20} height={20} />
				<span className={styles.button_text}>Raise Alarm</span>
			</Button>

			{show && (
				<Modal
					className={styles.styled_modal}
					show={show}
					onClose={() => setShow(false)}
				>
					<RaiseAlarmModal setShow={setShow} alarmId={alarmId} setAlarmId={setAlarmId} />
				</Modal>
			)}
		</div>
	);
}

export default RaiseAlarm;
