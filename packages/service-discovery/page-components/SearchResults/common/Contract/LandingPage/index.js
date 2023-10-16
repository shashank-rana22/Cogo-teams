import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const FEATURES_MAPPING = [
	{
		icon  : GLOBAL_CONSTANTS.image_url.lock_icon,
		label : '30 Day Price Lock In',
		text  : 'Free of Market Fluctuation',
	},
	{
		icon  : GLOBAL_CONSTANTS.image_url.calender_icon,
		label : 'Ease of Consumption',
		text  : 'With Shipment Plan',
	}, {
		icon  : GLOBAL_CONSTANTS.image_url.guarenteed_booking_icon,
		label : 'Guaranteed Booking',
		text  : 'Planned Procurement',
	},
];

function LandingPage({
	setShow = () => {},
	setScreen = () => {},
	service = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.content_container}>
				<div className={styles.text_container}>
					<span className={styles.main_heading}>Get more benefit with a contract</span>

					<div className={styles.supporting_text_container}>
						{service === 'fcl_freight' ? (
							<span className={styles.supporting_text}>
								Usually, for container counts greater than 50, we recommend going for a contract.
							</span>
						) : null}

						<strong className={styles.supporting_text}>
							Following are the benefits of having a contract with Cogoport -
						</strong>
					</div>
				</div>

				<div className={styles.features_container}>
					{FEATURES_MAPPING.map((feature) => {
						const { icon, label, text } = feature;

						return (
							<div key={label} className={styles.feature}>
								<img src={icon} alt={label} height={50} style={{ objectFit: 'cover' }} />

								<span className={styles.feature_label}>{label}</span>
								<span className={styles.feature_text}>{text}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className={styles.footer}>
				<strong className={styles.footer_label}>
					So, would you like to convert this booking into a contract?
				</strong>

				<div className={styles.buttons_container}>
					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: 16 }}
						onClick={() => setShow(false)}
					>
						No
					</Button>

					<Button
						size="lg"
						themeType="accent"
						onClick={() => setScreen('request_contract')}
					>
						Yes
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
