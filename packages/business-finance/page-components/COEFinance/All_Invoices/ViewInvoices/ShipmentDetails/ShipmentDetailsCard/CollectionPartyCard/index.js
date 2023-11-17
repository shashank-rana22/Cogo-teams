import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import { getDetailValueColor } from '../../../../../utils/getDetailValueColor';
import { getLabelStyle, getIcon } from '../../../../../utils/getLabelStyle';
import isDisabled from '../../../../../utils/isDisabled';

import styles from './styles.module.css';

const CARD_ID = 1;
const PRESENT_TAB = 'collectionPartyTab';
const TAB_TO_OPEN = 'billingPartyTab';
const TIMELINE_ITEM = 'collectionPartyCheck';
const LABEL = 'Bank Details - Collection Party';

function CollectionPartyCard({
	showValue = [],
	isInvoiceApproved = false,
	rejected = [],
	handleClickUndo = () => {},
	collectionPartyRejectionList = [],
	handleClickReject = () => {},
	handleClick = () => {},
	status = '',
	docContent = {},
	setCheckItem = (prop) => (prop),
	onAccept = () => {},
	onTabClick = () => {},
	showTab = false,
}) {
	const labelStyle = getLabelStyle({ CARD_ID, showValue, rejected, styles, isInvoiceApproved });

	const iconElement = getIcon({ CARD_ID, showValue, rejected, styles, isInvoiceApproved });

	const onClickResponse = ({ response }) => {
		if (response) {
			handleClick(CARD_ID);
			onAccept({ tabName: PRESENT_TAB, tabToOpen: TAB_TO_OPEN, timelineItem: TIMELINE_ITEM });
		} else {
			handleClickReject(CARD_ID);
		}
	};
	const handleUndo = () => {
		handleClickUndo(CARD_ID);
		setCheckItem(
			(prev) => ({ ...prev, collectionPartyCheck: false }),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div
					className={labelStyle}
				>
					{LABEL}
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
								<div
									className={styles.caret}
									onClick={() => {
										onTabClick({ tabName: PRESENT_TAB });
									}}
									role="presentation"
								>
									<IcMArrowRotateUp height="17px" width="17px" />

								</div>
							</div>
						) : (
							<div className={styles.button_container}>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="primary"
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
			<div
				className={styles.bottom_card}
				style={{ maxHeight: showTab ? '252px' : '0' }}
			>
				<div className={styles.hr} />

				<div className={styles.billing_party_container}>
					{collectionPartyRejectionList?.map((item) => {
						const [labelText, valueText] = (item?.label || '').split(' : ');
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
										color: getDetailValueColor({
											detectKey : item?.detectKey,
											value     : valueText,
											docContent,
										}),
									}}
								>
									{valueText}
								</span>
							</div>
						);
					})}
				</div>

			</div>
		</div>
	);
}

export default CollectionPartyCard;
