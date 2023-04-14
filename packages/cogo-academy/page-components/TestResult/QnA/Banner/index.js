import { Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Banner({ scrollToSubjective = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<IcMInformation width={20} height={20} style={{ color: '#D6B400' }} />
				<div className={styles.text}>Please Grade the Subjective Answers in order to Generate Result</div>
			</div>

			<div className={styles.right_section}>
				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={scrollToSubjective}
				>
					Redirect to Subjective Answers
				</Button>
			</div>
		</div>
	);
}

export default Banner;
