import { Button, cl } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Comments({ description = '' }) {
	const { t } = useTranslation(['myTickets']);

	const [showContent, setShowContent] = useState(false);
	return (
		<div className={styles.container}>
			<Button
				size="xs"
				themeType="linkUi"
				className={styles.header}
				onClick={() => setShowContent((prev) => !prev)}
			>
				{t('myTickets:comments')}
				<span className={styles.icon}>
					{showContent
						? <IcMArrowUp />
						: <IcMArrowDown />}
				</span>
			</Button>
			<div
				className={cl`${styles.content} ${showContent ? styles.expand : ''}`}
			>
				<div className={styles.desc}>
					{description}
				</div>
			</div>
		</div>
	);
}

export default Comments;
