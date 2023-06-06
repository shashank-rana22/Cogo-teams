import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import PredefinedTncAndPrivacyPolicy from './PredefinedTncAndPrivacyPolicy';
import styles from './styles.module.css';

function TncItem(props) {
	const { list } = props;

	const keysForList = useMemo(
		() => Array(list.length).fill(null).map(() => Math.random()),
		[list.length],
	);
	if (isEmpty(list)) {
		return <PredefinedTncAndPrivacyPolicy />;
	}

	return (
		<div className={styles.container}>
			{list.map((val, index) => (
				<div className={styles.condition} key={keysForList[index]}>
					<ul>
						<li>{val}</li>
					</ul>
				</div>
			))}
		</div>
	);
}

export default TncItem;
