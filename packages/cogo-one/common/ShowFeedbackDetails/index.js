import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ShowFeedbackDetails({
	showFeedback = false,
	setShowFeedback = () => {},
	type = 'user',
	communication_log = {},
}) {
	const showCardDetailsStyles = cl`${styles.show_card_details}
			 ${type === 'user' ? styles.show_card_details_user : styles.show_card_details_agent}`;

	const communicationResponse = communication_log?.communication_response;
	const communicationSummary = communication_log?.communication_summary;

	const noFeedback = isEmpty(communicationResponse) && isEmpty(communicationSummary);

	const FEEDBACK_CARD_MAPPING = [
		{
			label : 'Summary:',
			value : communicationSummary,
			key   : 'summary',
		},
		{
			label : 'Status:',
			value : communicationResponse,
			key   : 'status',
		},
	];

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => {
				setShowFeedback((prev) => !prev);
			}}
		>
			<div>
				{showFeedback ? (
					<div className={cl`${styles.hide_card_details} ${setShowFeedback ? showCardDetailsStyles : ''}`}>
						{noFeedback ? <div className={styles.no_feedback_label}>No Feedback</div> : (
							<>
								{(FEEDBACK_CARD_MAPPING).map((item) => (
									<div className={styles.card_section} key={item.key}>
										<div className={styles.label}>{item.label}</div>
										<span>
											{item?.value}
										</span>

									</div>
								))}
							</>
						)}

					</div>
				) : null}
			</div>
			<div className={cl`${styles.icon_area}
			 ${type === 'user' ? styles.icon_area_grey : styles.icon_area_yellow}`}
			>
				<IcMArrowDown className={showFeedback ? styles.up_arrow : styles.arrow_down} />
			</div>
		</div>
	);
}

export default ShowFeedbackDetails;
