import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedBackModal from './FeedBackModal';
import styles from './styles.module.css';

function RequestRate({ data = {} }) {
	const [showFeedbackModal, setShowFeedBackModal] = useState(false);

	const addedAdditionalService = [];

	Object.keys(data?.service_details || {}).forEach((service) => {
		if (
			!['fcl_freight', 'air_freight'].includes(
				data?.service_details?.[service]?.service_type,
			)
		) {
			addedAdditionalService.push(
				`${data?.service_details?.[service]?.trade_type}_
				${data?.service_details?.[service]?.service_type}`,
			);
		}
	});

	let proceeedWithFeedback = !(
		['fcl_freight', 'air_freight'].includes(data?.service_type)
		&& data?.inco_term === 'exw'
	);

	if (['fcl_freight', 'air_freight'].includes(data?.service_type)) {
		if (
			(addedAdditionalService.includes('export_ftl_freight')
				|| addedAdditionalService.includes('export_ltl_freight')
				|| addedAdditionalService.includes('export_haulage_freight')
				|| addedAdditionalService.includes('export_trailer_freight'))
			&& (addedAdditionalService.includes('export_fcl_customs')
				|| addedAdditionalService.includes('export_air_customs'))
		) {
			proceeedWithFeedback = true;
		}
	}

	const onClose = () => {
		setShowFeedBackModal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<p className={styles.label}>Missing Rate Feedback</p>

				<p className={styles.text}>
					The rates for Zim Liner, Hapag Lloyed are unavailable.
					Send feedback about unavailability to help the team improve rates.
				</p>
			</div>

			<div className={styles.right_section}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setShowFeedBackModal(true)}
				>
					<span className={styles.button_text}>Send Feedback</span>
					<IcMArrowRight fontSize={15} />
				</Button>
			</div>

			{showFeedbackModal ? (
				<FeedBackModal
					onClose={onClose}
					show={showFeedbackModal}
					data={data}
					proceeedWithFeedback={proceeedWithFeedback}
				/>
			) : null}
		</div>
	);
}

export default RequestRate;
