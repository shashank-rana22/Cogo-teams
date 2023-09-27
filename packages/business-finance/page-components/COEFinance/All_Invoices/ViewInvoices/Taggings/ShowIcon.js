import { IcCFtick, IcMCrossInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ShowIcon({ value = {} }) {
	if (value?.approve === 'approve') {
		return <IcCFtick height="17px" width="17px" />;
	} if (value?.reject === 'reject') {
		return (
			<div className={styles.color_reject}>
				<IcMCrossInCircle height="17px" width="17px" />
			</div>
		);
	}
	return null;
}

export default ShowIcon;
