import { Popover, Tooltip, cl } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ClickableDiv from '../../../../../../../ClickableDiv';
import styles from '../styles.module.css';

import Content from './Content';
import RemarkRender from './RemarkRender';

function InvoiceDetails({
	invoice = {},
	isAuthorized = false,
	disableAction = false,
	setShow = () => {},
	show = false,
	setExchangeRate = () => {},
	setAddCustomerInvoice = () => {},
	setUpdateCustomerInvoice = () => {},
	setFillCustomerData = () => {},
	setIsEditInvoice = () => {},
	setIsChangeCurrency = () => {},
	setShowAddRemarks = () => {},
	setShowChangePaymentMode = () => {},
}) {
	return (
		<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
			{(!disableAction || !isEmpty(invoice?.exchange_rate_document))
					&& invoice?.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={(
								<Content
									isAuthorized={isAuthorized}
									invoice={invoice}
									disableAction={disableAction}
									setShow={setShow}
									setExchangeRate={setExchangeRate}
									setAddCustomerInvoice={setAddCustomerInvoice}
									setUpdateCustomerInvoice={setUpdateCustomerInvoice}
									setFillCustomerData={setFillCustomerData}
									setIsEditInvoice={setIsEditInvoice}
									setIsChangeCurrency={setIsChangeCurrency}
									setShowAddRemarks={setShowAddRemarks}
									setShowChangePaymentMode={setShowChangePaymentMode}
								/>
							)}
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
				)
				: (
					<div className={styles.empty_div} />
				)}

			{!isEmpty(invoice?.remarks) ? (
				<Tooltip
					placement="bottom"
					content={<RemarkRender invoice={invoice} />}
				>
					<div className={styles.icon_more_wrapper}>
						<IcMInfo fill="#DDEBC0" />
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}

export default InvoiceDetails;
