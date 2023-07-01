import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function GPTAnswer({ answer, showMore, search }) {
	const handleClick = () => {
		window.open(showMore, '_blank');
	};

	return (
		<div className={styles.list}>
			<div className={styles.topic_heading}>
				Search Result:
				<div className={styles.question}>
					{startCase(search)}
				</div>
			</div>

			<div className={styles.title}>Answer:</div>
			<div className={styles.ans}>
				{answer}
			</div>

			{showMore ? (
				<Button style={{ marginTop: '16px' }} size="md" themeType="primary" onClick={handleClick}>
					Show More
				</Button>
			) : null}

		</div>
	);
}

export default GPTAnswer;
