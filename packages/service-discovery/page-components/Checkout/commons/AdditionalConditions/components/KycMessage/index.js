import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function KycMessage({
	status = '',
	detail = {},
	getCheckout = () => {},
	loading = false,
}) {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const { importer_exporter_id } = detail;

	const { partner_id = '' } = query;

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

			<div
				role="presentation"
				className={styles.refresh_text}
				onClick={() => getCheckout()}
			>
				<div>Refresh </div>
				<div
					className={cl`${styles.refresh_icon} ${
						loading ? styles.animate : ''
					}`}
				>
					<IcMRefresh
						style={{
							transform: 'scaleX(-1)',
						}}
					/>
				</div>
			</div>

			<Button
				type="button"
				size="md"
				themeType="secondary"
				style={{ width: '30%' }}
				onClick={() => {
					window.open(
						`${window.location.origin}/${partner_id}/details/demand/${importer_exporter_id}`,
						'_blank',
					);
				}}
			>
				{status === 'rejected' ? 'RESUBMIT KYC' : 'Submit KYC'}
			</Button>
		</div>
	);
}

export default KycMessage;
