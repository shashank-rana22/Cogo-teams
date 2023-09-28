import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TemplateSuggestion() {
	return (
		<div className={styles.container}>
			<Tooltip
				content="hello"
				placement="bottom"
				interactive
			>
				Cogoport
			</Tooltip>
		</div>
	);
}

export default TemplateSuggestion;
