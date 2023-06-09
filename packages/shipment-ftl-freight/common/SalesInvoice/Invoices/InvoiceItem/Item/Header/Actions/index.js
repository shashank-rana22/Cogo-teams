import { Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	IcMOverflowDot,
	IcMInfo,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import ClickableDiv from '../../../../../../ClickableDiv';

import KebabContent from './KebalContent';
import styles from './styles.module.css';

const AddCustomerInvoice = dynamic(() => import('./AddCustomerInvoice'), { ssr: false });
const ExchangeRateModal = dynamic(() => import('./ExchangeRateModal'), { ssr: false });
const FillCustomerPortalData = dynamic(() => import('./FillCustomerPortalData'), { ssr: false });
const UpdateCustomerInvoice = dynamic(() => import('./UpdateCustomerInvoice'), { ssr: false });
const EditInvoice = dynamic(() => import('../EditInvoice'), { ssr: false });
const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
	disableAction = false,
}) {
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState();

	const { shipment_data } = useContext(ShipmentDetailContext);

	const handleSetter = (selected_modal) => {
		setShowModal(selected_modal);
		setShow(false);
	};

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const modalComponents = {
		change_currency: <ChangeCurrency
			setShowModal={setShowModal}
			invoice={invoice}
			refetch={handleRefetch}
		/>,
		rate_sheet   : <ExchangeRateModal setShowModal={setShowModal} invoice={invoice} />,
		add_remark   : <AddRemarks setShowModal={setShowModal} invoice={invoice} refetch={handleRefetch} />,
		payment_mode : <ChangePaymentMode
			setShowModal={setShowModal}
			invoice={invoice}
			refetch={handleRefetch}
		/>,
		update_customer_invoice: <UpdateCustomerInvoice
			setShowModal={setShowModal}
			refetch={handleRefetch}
			shipmentData={shipment_data}
			invoice={invoice}
		/>,
		fill_portal_data: <FillCustomerPortalData
			setShowModal={setShowModal}
			handleRefetch={handleRefetch}
			shipmentData={shipment_data}
			invoice={invoice}
		/>,
		add_customer_invoice: <AddCustomerInvoice
			setShowModal={setShowModal}
			handleRefetch={handleRefetch}
			invoice={invoice}
			shipmentData={shipment_data}
		/>,
	};

	const modalComponent = modalComponents[showModal];

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{invoice.status ? (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						) : null}
					</div>
				</div>

				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>

					{(!disableAction || invoice.exchange_rate_document?.length > 0)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={(
								<KebabContent
									handleSetter={handleSetter}
									commonActions={commonActions}
									editInvoicesVisiblity={editInvoicesVisiblity}
									invoice={invoice}
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

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							content={remarkRender()}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{(invoice.services || []).length && showModal === 'edit_invoice' ? (
				<EditInvoice
					onClose={() => setShowModal(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{modalComponent}

		</div>
	);
}

export default Actions;
