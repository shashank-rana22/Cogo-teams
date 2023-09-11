import { Button } from '@cogoport/components';
import { IcCFtick, IcMCrossInCircle, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const CARD_ID = 1;

function CollectionPartyCard({
	id = '',
	label = '',
	showValue = [],
	isInvoiceApproved = false,
	rejected = [],
	handleClickUndo = () => {},
	collectionPartyRejectionList = [],
	handleClickReject = () => {},
	handleClick = () => {},
	isDisabled = () => {},
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
			(prev) => ({ ...prev, collectionPartyCheck: true }),
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
						className={styles.arrow_icon}
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
											(prev) => ({ ...prev, collectionPartyCheck: false }),
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
				) }

			</div>
			{showDetails ? (
				<div>
					<div className={styles.hr} />

					<div className={styles.billing_party_container}>
						{collectionPartyRejectionList?.map((item) => {
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
			) : undefined }

		</div>
	);
}

export default CollectionPartyCard;
