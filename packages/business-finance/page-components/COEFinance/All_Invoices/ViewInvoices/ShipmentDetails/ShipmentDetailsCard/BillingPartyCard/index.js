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
	billingPartyRejectionList = [],
	handleClickReject = () => {},
	handleClick = () => {},
	isDisabled = false,
	status = '',
	docContent = '',
	setCheckItem = () => {},
}) {
	const [showDetails, setShowDetails] = useState(false);

	let labelClassName;
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

	const onClickResponse = (response = true) => {
		if (response) {
			handleClick(id);
		} else {
			handleClickReject(id);
		}
		setCheckItem(
			(prev) => ({ ...prev, billingPartyCheck: true }),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div
					className={labelClassName}
				>
					{label}
					<div
						className={styles.icon_section}
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
								<Button
									onClick={() => {
										setCheckItem(
											(prev) => ({ ...prev, billingPartyCheck: false }),
										);
									}}
									size="md"
									themeType="secondary"
								>
									Undo
								</Button>
							</div>
						) : (
							<div className={styles.button_container}>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									onClick={() => { onClickResponse(true); }}
								>
									Approve
								</Button>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									style={{ border: '1px solid #ed3726' }}
									onClick={() => { onClickResponse(false); }}
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
			{showDetails && (
				<div>
					<div className={styles.hr} />

					<div className={styles.billing_party_container}>
						{billingPartyRejectionList?.map((item) => {
							const [labelText, valueText] = (item?.label || '').split(' - ');
							return (
								<div
									key={item?.label}
									className={styles.margin_bottom}
								>
									{labelText}
									{' '}
									-
									{' '}
									<span
										style={{
											color: docContent?.includes(valueText)
												? 'green' : 'auto',
										}}
									>
										{valueText}
									</span>
								</div>
							);
						})}

					</div>

				</div>
			)}
		</div>
	);
}

export default BillingPartyCard;
