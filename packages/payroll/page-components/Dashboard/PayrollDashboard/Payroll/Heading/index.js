import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Heading({ data = {}, handleSetup = () => {} }) {
	return (
		<div className={styles.flex}>
			<div className={styles.top_text_container}>
				<span className={styles.top_bold_text}>
					Welcome back,
					{' '}
					{data?.employee_name}
					!
				</span>
			</div>
			<div className={styles.buttons_div}>
				<Button
					size="lg"
					className={styles.header_button}
					themeType="secondary"
					onClick={() => handleSetup('run_payroll')}
				>
					Run New Payroll

				</Button>
			</div>
		</div>

	);
}

export default Heading;
