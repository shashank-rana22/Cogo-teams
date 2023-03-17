import { Button } from '@cogoport/components';
import { useState } from 'react';

import LeaveTest from './LeaveTest';
import styles from './styles.module.css';

function Footer({ currentQuestion, setCurrentQuestion }) {
	const [leaveTest, setLeaveTest] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.button_container}>

				<Button themeType="secondary" onClick={() => setLeaveTest(true)}>Leave Test</Button>

				<div className={styles.right_button_container}>
					<Button themeType="secondary" style={{ marginRight: 12 }}>Mark for Review</Button>

					<Button
						disabled={currentQuestion > 4}
						onClick={() => setCurrentQuestion((pv) => pv + 1)}
					>
						Next
					</Button>
				</div>

			</div>
			{leaveTest ? <LeaveTest leaveTest={leaveTest} setLeaveTest={setLeaveTest} /> : null}
		</div>
	);
}

export default Footer;
