import { Button, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedBackModal from './FeedBackModal';
import styles from './styles.module.css';

function RequestRate({ details = {}, className = null, rates = [], isMobile = false }) {
	const [showFeedbackModal, setShowFeedBackModal] = useState(false);

	const ADDITIONAL_SERVICES = [];

	Object.keys(details?.service_details || {}).forEach((service) => {
		if (
			!['fcl_freight', 'air_freight'].includes(
				details?.service_details?.[service]?.service_type,
			)
		) {
			ADDITIONAL_SERVICES.push(
				`${details?.service_details?.[service]?.trade_type}_${
					details?.service_details?.[service]?.service_type}`,
			);
		}
	});

	let proceeedWithFeedback = !(
		['fcl_freight', 'air_freight'].includes(details?.service_type)
		&& details?.inco_term === 'exw'
	);

	if (['fcl_freight', 'air_freight'].includes(details?.service_type)) {
		if (
			(ADDITIONAL_SERVICES.includes('export_ftl_freight')
				|| ADDITIONAL_SERVICES.includes('export_ltl_freight')
				|| ADDITIONAL_SERVICES.includes('export_haulage_freight')
				|| ADDITIONAL_SERVICES.includes('export_trailer_freight'))
			&& (ADDITIONAL_SERVICES.includes('export_fcl_customs')
				|| ADDITIONAL_SERVICES.includes('export_air_customs'))
		) {
			proceeedWithFeedback = true;
		}
	}

	const onClose = () => {
		setShowFeedBackModal(false);
	};

	return (
		<div className={cl`${styles.container} ${className}`}>
			<div className={styles.left_section}>
				<p className={styles.label}>Missing Rate Feedback</p>

				<p className={styles.text}>
					Unable to find the rates? Send feedback about unavailability to help the team improve rates.
				</p>
			</div>

			<Button
				type="button"
				size="md"
				themeType="secondary"
				onClick={() => setShowFeedBackModal(true)}
				className={styles.button}
			>
				<span className={styles.button_text}>Send Feedback</span>
				<IcMArrowRight fontSize={15} />
			</Button>

			{showFeedbackModal ? (
				<FeedBackModal
					onClose={onClose}
					show={showFeedbackModal}
					details={details}
					proceeedWithFeedback={proceeedWithFeedback}
					rates={rates}
					isMobile={isMobile}
				/>
			) : null}
		</div>
	);
}

export default RequestRate;
