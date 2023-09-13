import { Button } from '@cogoport/components';
import { IcCFtick, IcMCrossInCircle, IcMArrowRotateDown } from '@cogoport/icons-react';

import { getDetailValueColor } from '../../../../../utils/getDetailValueColor';
import isDisabled from '../../../../../utils/isDisabled.ts';

import styles from './styles.module.css';

const CARD_ID = 1;
const PRESENT_TAB = 'collectionPartyTab';
const TAB_TO_OPEN = 'billingPartyTab';
const TIMELINE_ITEM = 'collectionPartyCheck';

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
	status = '',
	docContent = '',
	setCheckItem = (prop) => (prop),
	onAccept = (prop) => (prop),
	onTabClick = (prop) => (prop),
	showTab = false,
}) {
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

	const onClickResponse = ({ response }) => {
		if (response) {
			handleClick(id);
			onAccept({ tabName: PRESENT_TAB, tabToOpen: TAB_TO_OPEN, timelineItem: TIMELINE_ITEM });
		} else {
			handleClickReject(id);
		}
	};
	const handleUndo = () => {
		handleClickUndo(id);
		setCheckItem(
			(prev) => ({ ...prev, collectionPartyCheck: false }),
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

				{showTab ? (!isInvoiceApproved && (
					<div>
						{showValue.includes(CARD_ID) || rejected.includes(CARD_ID) ? (
							<div
								className={styles.button_container}
								role="presentation"
							>
								<Button
									onClick={() => {
										handleUndo();
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
									onClick={() => onClickResponse({
										response: true,
									})}
								>
									Approve
								</Button>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									style={{ border: '1px solid #ed3726' }}
									onClick={() => onClickResponse({
										response: false,
									})}
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
							onTabClick({ tabName: PRESENT_TAB });
						}}
						role="presentation"
					>
						<IcMArrowRotateDown height="17px" width="17px" />

					</div>
				) }

			</div>
			{showTab ? (
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
											color: getDetailValueColor({ value: valueText, docContent }),
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
