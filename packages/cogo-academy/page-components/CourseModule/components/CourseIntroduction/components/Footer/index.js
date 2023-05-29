import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

export function Footer({ course_id }) {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<Button
				className={styles.btn}
				themeType="secondary"
				styles={{ margin: '10px' }}
			>
				Schedule Time to Begin
			</Button>
			<Button
				className={styles.btn}
				themeType="accent"
				onClick={() => { router.push(`/learning/course/${course_id}`); }}
			>
				Begin Course

			</Button>
		</div>
	);
}
