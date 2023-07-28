import { cl } from '@cogoport/components';

import styles from './styles.module.css';

const CLASS_NAMES = {
	FCL: 'red',
};

export default function ServiceIcon({ Icon = null, text = '' }) {
	return (
		<div className={cl`${styles.icon_container} ${styles[CLASS_NAMES[text]]}`}>
			{Icon ? <Icon /> : null}

			<div className={styles.icon_text}>
				{text}
			</div>
		</div>
	);
}
