import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

function Header({ activeTab }) {
	const { title, text } = MAPPING[activeTab];

	return (
		<div>
			<div className={styles.top_container}>
				<div className={styles.left_part}>
					<div className={styles.title}>Course Trial ABC</div>
				</div>

				<div className={styles.right_part}>
					<Button className={styles.button} size="sm" themeType="secondary">Preview</Button>
					<Button className={styles.button} size="sm" themeType="primary">Publish</Button>

					<IcMDelete className={styles.button} />
				</div>
			</div>

			<div className={styles.bottom_container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.text}>{text}</div>
			</div>
		</div>
	);
}

export default Header;
