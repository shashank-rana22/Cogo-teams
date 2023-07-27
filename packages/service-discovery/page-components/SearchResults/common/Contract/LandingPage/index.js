import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const FEATURES_MAPPING = [
	{
		icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/guarenteed_booking',
		label : '30 Day Price Lock In',
		text  : 'Free of Market Fluctuation',
	},
	{
		icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/guarenteed_booking',
		label : '30 Day Price Lock In',
		text  : 'Free of Market Fluctuation',
	}, {
		icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/guarenteed_booking',
		label : '30 Day Price Lock In',
		text  : 'Free of Market Fluctuation',
	},
];

function LandingPage({
	setShow = () => {},
	setScreen = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.content_container}>
				<div className={styles.text_container}>
					<span className={styles.main_heading}>Get more benefit with a contract</span>

					<div className={styles.supporting_text_container}>
						<span className={styles.supporting_text}>
							Usually, for container counts greater than 50, we recommend going for a contract.
						</span>

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
								<img src={icon} alt="" height={50} style={{ objectFit: 'cover' }} />

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
