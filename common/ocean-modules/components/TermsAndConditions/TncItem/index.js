import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import PredefinedTncAndPrivacyPolicy from './PredefinedTncAndPrivacyPolicy';
import styles from './styles.module.css';

function TncItem(props) {
	const { list } = props;

	const listKeys = useMemo(() => Array(list?.length).fill(null).map(() => Math.random()), [list?.length]);

	if (isEmpty(list)) {
		return <PredefinedTncAndPrivacyPolicy />;
	}

	return (
		<div className={styles.container}>
			<ul>
				{list.map((val, index) => <li key={listKeys[index]} className={styles.condition}>{val}</li>)}
			</ul>
		</div>
	);
}

export default TncItem;
