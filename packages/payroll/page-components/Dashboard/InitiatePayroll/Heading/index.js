import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Heading({ month = '', handledownload = () => {}, handleBack = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<IcMArrowBack width={14} height={14} onClick={handleBack} className={styles.back_btn} />
				<div className={styles.top_text_container}>
					<span className={styles.top_bold_text}>
						{upperCase(month)}
						{' '}
						cycle
					</span>
					<span className={styles.top_grey_text}>Pay employees quickly</span>
				</div>

			</div>
			<div>
				<Button size="md" themeType="secondary" onClick={handledownload}>Download Payroll Sheet</Button>
			</div>
		</div>

	);
}

export default Heading;
