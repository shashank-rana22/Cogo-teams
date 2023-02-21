import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Top1() {
	return (
		<div className={styles.top1}>
			Profile
			<Button size="md" themeType="secondary">Edit Profile</Button>
		</div>
	);
}

export default Top1;
