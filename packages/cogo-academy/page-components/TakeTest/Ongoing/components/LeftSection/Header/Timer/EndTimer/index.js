import { Button, Modal } from '@cogoport/components';

import useEndTest from '../../../../../hooks/useEndTest';
import StatsDisplay from '../../../../utils/StatsDisplay';

import styles from './styles.module.css';

function EndTimer({ data = {}, showTimeOverModal }) {
	const { endTest } = useEndTest({});

	return (
		<Modal size="md" show={showTimeOverModal}>
			<Modal.Body>
				<div className={styles.container}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg" alt="timer" />
					{' '}
					<b className={styles.heading}>Time&apos;s Up</b>
				</div>

				<p>
					The test time has ended.
					Your responses will be now be submitted.Thank You for ttempting the test.

				</p>
				<StatsDisplay data={data} />

				<Button
					onClick={endTest}
					style={{ marginRight: 12 }}
					themeType="secondary"
				>
					Submit
				</Button>
			</Modal.Body>
		</Modal>
	);
}

export default EndTimer;
