import { IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

function FileFilter({ fileName = '', onRemoveCsvFilter = () => {} }) {
	return (
		<div className={styles.field_container}>
			<div className={styles.filter_text}>
				{fileName}
			</div>
			<IcMDelete className={styles.filter_delete} onClick={onRemoveCsvFilter} />
		</div>
	);
}

export default FileFilter;
