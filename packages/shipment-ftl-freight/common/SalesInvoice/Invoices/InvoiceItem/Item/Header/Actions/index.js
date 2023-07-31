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

const remarkRender = ({ invoice }) => (
	<div className={styles.remarkcontainer}>
		<div className={styles.title}>Invoice Remarks</div>
		<div className={styles.value}>{invoice.remarks}</div>
	</div>
);

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
	disableAction = false,
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleSetter = (selected_modal) => {
		setShowModal(selected_modal);
		setShow(false);
	};

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity = (shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const modalComponents = {
		changeCurrency: <ChangeCurrency
			setShowModal={setShowModal}
			invoice={invoice}
			refetch={handleRefetch}
		/>,
		rateSheet   : <ExchangeRateModal setShowModal={setShowModal} invoice={invoice} />,
		addRemark   : <AddRemarks setShowModal={setShowModal} invoice={invoice} refetch={handleRefetch} />,
		paymentMode : <ChangePaymentMode
			setShowModal={setShowModal}
			invoice={invoice}
			refetch={handleRefetch}
		/>,
		updateCustomerInvoice: <UpdateCustomerInvoice
			setShowModal={setShowModal}
			refetch={handleRefetch}
			shipmentData={shipment_data}
			invoice={invoice}
		/>,
		fillPortalData: <FillCustomerPortalData
			setShowModal={setShowModal}
			handleRefetch={handleRefetch}
			shipmentData={shipment_data}
			invoice={invoice}
		/>,
		addCustomerInvoice: <AddCustomerInvoice
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
					{(!disableAction || !isEmpty(invoice.exchange_rate_document))
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
							<ClickableDiv className={styles.icon_more_wrapper} onClick={() => setShow(!show)}>
								<IcMOverflowDot />
							</ClickableDiv>
						</Popover>
						)
						: (
							<div className={styles.empty_div} />
						)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip placement="bottom" content={remarkRender({ invoice })}>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{(invoice.services || []).length && showModal === 'isEditInvoice' ? (
				<EditInvoice
					show={showModal === 'isEditInvoice'}
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
