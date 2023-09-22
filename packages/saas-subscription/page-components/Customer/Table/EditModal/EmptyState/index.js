import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function EmptyState({ currentTab }) {
	return (
		<div className={styles.empty_ctn}>
			<Image
				className={styles.empty_state}
				src={GLOBAL_CONSTANTS.image_url.ticket_not_found}
				width={150}
				height={150}
			/>
			<p style={{ textAlign: 'center' }}>{`No ${startCase(currentTab)} avaliable`}</p>
		</div>

	);
}

export default EmptyState;
