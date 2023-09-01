import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function CogoportTemplate({ from = {} }) {
	return (
		<div className={styles.container}>
			<Image
				alt="empty image"
				width={16}
				height={16}
				className={styles.img}
				src={GLOBAL_CONSTANTS.image_url.cogoport_email_logo}
			/>
			<div className={styles.best_importer}>
				The best import and export services at one place
			</div>
			<div className={styles.address}>
				<div>
					Ackruti Trade Centre, 6th floor
				</div>
				<div>
					Road No. 7, Marol MIDC, Andheri (East),
				</div>
				<div>
					Maharashtra, Mumbai 400093
				</div>
			</div>
			<div className={styles.sender_info}>
				<div>
					Supply Relation Manager :
					{' '}
					{from?.name}
				</div>
				<div>
					Email :
					{from?.email}
				</div>
				<div>
					Mob :
					{' '}
					{from?.mobile_number}
				</div>
			</div>
		</div>
	);
}

export default CogoportTemplate;
