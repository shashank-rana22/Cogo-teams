import { Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function HeaderCard() {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Currently Editing&nbsp;:&nbsp;
					<strong>Saved Draft</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On&nbsp;:&nbsp;
						<strong>{format(new Date(), 'dd MMM yyyy')}</strong>
					</div>

					<div>
						Published by&nbsp;:&nbsp;
						<strong>Cogoparth</strong>
					</div>
				</div>
			</div>
			<div className={styles.button_container}>
				<Button themeType="secondary">Save as Draft</Button>
				<Button>Publish</Button>

			</div>
		</div>
	);
}

export default HeaderCard;
