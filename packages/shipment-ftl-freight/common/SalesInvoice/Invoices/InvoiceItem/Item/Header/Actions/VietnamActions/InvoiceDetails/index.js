import { Popover, Tooltip, cl } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMInfo,
	IcMEmail,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ClickableDiv from '../../../../../../../../ClickableDiv';

import styles from './styles.module.css';

function InvoiceDetails({
	invoice = {},
	disableAction = false,
	setSendEmail = () => {},
	setShow = () => {},
	show = () => {},
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
}) {
	const handleClick = (setState = () => {}) => {
		setShow(false);
		setState(true);
	};
	const {
		proforma_email_count = 0,
		sales_email_count = 0,
		sales_utr,
		remarks,
		status, exchange_rate_document,
	} = invoice || {};

	const remarkRender = (
		<div className={styles.remark_container}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{remarks}</div>
		</div>
	);

	const commonActions = status !== 'approved' && !disableAction;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						<ClickableDiv
							className={styles.text}
							onClick={() => handleClick(setIsChangeCurrency)}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>
					<ClickableDiv
						className={styles.text}
						onClick={() => handleClick(setShowAddRemarks)}
					>
						Add Remarks
					</ClickableDiv>
					<div>
						<div className={styles.line} />
						<ClickableDiv
							className={styles.text}
							onClick={() => handleClick(setShowChangePaymentMode)}
						>
							Change Payment Mode
						</ClickableDiv>
					</div>
				</>
			) : null}
			{(exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<ClickableDiv
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</ClickableDiv>
				</div>
			))}
		</div>
	);
	return (
		<div className={styles.actions_wrap}>
			<div className={styles.email_wrapper}>
				<IcMEmail
					onClick={() => handleClick(setSendEmail)}
				/>

				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div className={styles.tooltip_child}>
							<div className={styles.flex_row}>
								Proforma email sent :
								&nbsp;
								{proforma_email_count}
							</div>

							<div className={cl`${styles.flex_row} ${styles.margin}`}>
								Live email sent:
								&nbsp;
								{sales_email_count}
							</div>
							<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
								<div className={cl`${styles.flex_row} ${styles.margin}`}>
									UTR Number:
									&nbsp;
									{sales_utr?.utr_number || ''}
								</div>
								<div className={cl`${styles.flex_row} ${styles.margin}`}>
									Status:
									&nbsp;
									{sales_utr?.status || ''}
								</div>
							</div>
						</div>
					)}
				>
					<div className={styles.icon_div}>
						<IcMInfo />
					</div>
				</Tooltip>
			</div>

			{!disableAction || !isEmpty(exchange_rate_document) ? (
				<Popover
					interactive
					placement="bottom"
					visible={show}
					content={content}
					theme="light"
					onClickOutside={() => setShow(false)}
				>
					<ClickableDiv
						className={styles.icon_more_wrapper}
						onClick={() => setShow(!show)}
					>
						<IcMOverflowDot />
					</ClickableDiv>
				</Popover>
			) : (
				<div className={styles.empty_div} />
			)}

			{!isEmpty(remarks) ? (
				<Tooltip
					placement="bottom"
					theme="light-border"
					content={remarkRender}
				>
					<div className={styles.icon_more_wrapper}>
						<IcMInfo fill="yellow" />
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}

export default InvoiceDetails;
