import { Button, Modal } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { useEffect } from 'react';

import useEndTest from '../../../../../hooks/useEndTest';
import StatsDisplay from '../../../../utils/StatsDisplay';

import styles from './styles.module.css';

function EndTimer({ data = {}, showTimeOverModal, setShowTimeOverModal, setActiveState }) {
	const { endTest, endTestLoading } = useEndTest({ setShowTimeOverModal, setActiveState });

	useEffect(() => {
		setTimeout(() => {
			endTest();
		}, 5000);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal size="md" show={showTimeOverModal}>
			<Modal.Body>
				<div className={styles.container}>
					<Image
						width={32}
						height={32}
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg"
						alt="timer"
						width={18}
						height={22}
					/>
					{' '}
					<b className={styles.heading}>Time&apos;s Up</b>
				</div>

				<p>
					The test time has ended.
					Your responses will be now be submitted.Thank You for attempting the test.
				</p>
				<StatsDisplay data={data} />

				<Button
					onClick={endTest}
					style={{ marginRight: 12 }}
					className={styles.submit_button}
					loading={endTestLoading}
				>
					{endTestLoading ? 'Submitting' : 'Submit'}
				</Button>
			</Modal.Body>
		</Modal>
	);
}

export default EndTimer;
