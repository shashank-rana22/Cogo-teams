import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function KycMessage({ status }) {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<img
					src={GLOBAL_CONSTANTS.image_url.kyc_pending_png}
					alt="poclogo"
					width={44}
					height={44}
				/>

				<div className={styles.content}>
					<div className={styles.sub_heading}>KYC Verification Pending!</div>
					<div className={styles.text}>
						Before you can book, we need some basic information about your
						company. Please complete KYC to proceed
					</div>
				</div>
			</div>

			<Button
				type="button"
				size="md"
				themeType="secondary"
				style={{ width: '30%' }}
			>
				{status === 'rejected' ? 'RESUBMIT KYC' : 'Submit KYC'}
			</Button>
		</div>
	);
}

export default KycMessage;
