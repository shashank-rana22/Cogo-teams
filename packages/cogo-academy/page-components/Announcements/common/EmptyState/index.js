import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({
	text = 'Empty state',
	btn_text = '',
	onClick = () => {},
}) {
	return (
		<div className={styles.container}>

			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man"
				width={220}
				alt="Empty-state"
				className={styles.img_container}
			/>

			<div className={styles.details_container}>
				<div className={styles.txt}>
					{' '}
					{text}
					{' '}
				</div>

				<div className={styles.btn}>
					{btn_text ? <Button onClick={onClick} themeType="accent">{btn_text}</Button> : ''}
				</div>
			</div>

		</div>
	);
}

export default EmptyState;
