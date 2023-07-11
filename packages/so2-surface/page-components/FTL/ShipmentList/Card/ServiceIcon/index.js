import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function DefaultIcon() {
	return <div />;
}

const CLASS_NAMES = {
	FTL: 'ftl',
};

export default function ServiceIcon({ Icon = DefaultIcon, text = '' }) {
	return (
		<div className={cl`${styles.icon_container} ${styles[CLASS_NAMES[text]]}`}>
			<Icon />

			<div className={styles.icon_text}>
				{text}
			</div>
		</div>
	);
}
