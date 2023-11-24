import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function NewTag() {
	return (
		<div className={cl`${styles.pill} ${styles.bounce}`}>
			Newly added
		</div>
	);
}

export default NewTag;
