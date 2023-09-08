import { Button } from '@cogoport/components';
import {
	IcCFtick, IcMCrossInCircle,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const CARD_ID = 2;

function BillingPartyCard({
	id = '',
	label = '',
	showValue = false,
	isInvoiceApproved = false,
	rejected = true,
	handleClickUndo = () => {},
	billingPartyRejectionList = () => {},
	handleClickReject = () => {},
	handleClick = () => {},
	isDisabled = false,
	status = '',
}) {
	let labelClassName;
	const [showDetails, setShowDetails] = useState(false);
	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		labelClassName = styles.label_approved;
	} else if (rejected.includes(CARD_ID)) {
		labelClassName = styles.label_rejected;
	} else {
		labelClassName = styles.label;
	}

	let iconElement = null;

	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		iconElement = <IcCFtick height="17px" width="17px" />;
	} else if (rejected.includes(CARD_ID)) {
		iconElement = <IcMCrossInCircle height="17px" width="17px" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div
					className={labelClassName}
				>
					{label}
					<div
						style={{ justifyContent: 'center', display: 'flex' }}
					>
						{iconElement}
					</div>
				</div>

				{showDetails ? (!isInvoiceApproved && (
					<div>
						{showValue.includes(CARD_ID) || rejected.includes(CARD_ID) ? (
							<div
								className={styles.button_container}
								onClick={() => {
									handleClickUndo(id);
								}}
								role="presentation"
							>
								<Button size="md" themeType="secondary">
									Undo
								</Button>
							</div>
						) : (
							<div className={styles.button_container}>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									onClick={() => {
										handleClick(id);
									}}
								>
									Approve
								</Button>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									style={{ border: '1px solid #ed3726' }}
									onClick={() => {
										handleClickReject(id);
									}}
								>
									Reject
								</Button>
							</div>
						)}
					</div>
				)) : (
					<div
						className={styles.caret}
						onClick={() => {
							setShowDetails(true);
						}}
						role="presentation"
					>
						<IcMArrowRotateDown height="17px" width="17px" />

					</div>
				)}
			</div>
			{showDetails ? (
				<div>
					<div className={styles.hr} />

					<div className={styles.billing_party_container}>
						{billingPartyRejectionList?.map((item) => (
							<div key={item.label} className={styles.margin_bottom}>
								{item.label}
							</div>
						))}
					</div>

				</div>
			) : undefined}
		</div>
	);
}

export default BillingPartyCard;
