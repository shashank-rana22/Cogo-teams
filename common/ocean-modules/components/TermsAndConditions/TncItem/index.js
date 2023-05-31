import { isEmpty } from '@cogoport/utils';

import PredefinedTncAndPrivacyPolicy from './PredefinedTncAndPrivacyPolicy';
import styles from './styles.module.css';

function TncItem(props) {
	const { list } = props;

	if (isEmpty(list)) {
		return <PredefinedTncAndPrivacyPolicy />;
	}

	return (
		<div className={styles.container}>
			{list.map((val) => (
				<div className={styles.condition}>
					<ul>
						<li>{val}</li>
					</ul>
				</div>
			))}
		</div>
	);
}

export default TncItem;
