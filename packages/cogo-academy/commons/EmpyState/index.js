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
			<div className={styles.content}>
				<div className={styles.txt}>
					{' '}
					{text}
					{' '}
				</div>
				<div className={styles.btn}>
					{btn_text !== '' ? <Button onClick={onClick}>{btn_text}</Button> : ''}

				</div>
			</div>
		</div>
	);
}

export default EmptyState;
