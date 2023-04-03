import { IcMTimer } from '@cogoport/icons-react';

import styles from './styles.module.css';

function HeaderText({ setShowHistory = () => {} }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.popular_topics}>Popular Topics</div>

			<div className={styles.history_text_container}>
				<IcMTimer width={20} height={20} />

				<div
					role="presentation"
					className={styles.text_wrapper}
					onClick={() => setShowHistory(true)}
				>
					History

				</div>
			</div>

		</div>
	);
}

export default HeaderText;
