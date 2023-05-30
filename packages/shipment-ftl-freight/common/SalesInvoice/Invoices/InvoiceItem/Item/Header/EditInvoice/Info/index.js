import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Info() {
	return (
		<div className={styles.container}>
			<Tooltip
				theme="light"
				content={(
					<div className={styles.content_div}>
						You can enter customized line item name/code according to
						customer&apos;s need.
						{' '}
					</div>
				)}
				animation="scale"
				interactive
			>
				<div className={styles.info_div}>
					<IcMInfo fill="rgb(89, 54, 240)" />
				</div>
			</Tooltip>
		</div>
	);
}

export default Info;
