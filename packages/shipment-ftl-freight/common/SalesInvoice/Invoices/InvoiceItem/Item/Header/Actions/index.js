import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import EditInvoice from '../EditInvoice';

import AddCustomerInvoice from './AddCustomerInvoice';
import ExchangeRateModal from './ExchangeRateModal';
import FillCustomerPortalData from './FillCustomerPortalData';
import InvoiceDetails from './InvoiceDetails';
import styles from './styles.module.css';
import UpdateCustomerInvoice from './UpdateCustomerInvoice';

const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [addCustomerInvoice, setAddCustomerInvoice] = useState(false);
	const [updateCustomerInvoice, setUpdateCustomerInvoice] = useState(false);
	const [fillCustomerData, setFillCustomerData] = useState(false);
	const [showExchangeRate, setExchangeRate] = useState(false);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

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

					{/* {invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null} */}
				</div>

				<InvoiceDetails
					invoice={invoice}
					isAuthorized={isAuthorized}
					disableAction={disableAction}
					setShow={setShow}
					show={show}
					setExchangeRate={setExchangeRate}
					setAddCustomerInvoice={setAddCustomerInvoice}
					setUpdateCustomerInvoice={setUpdateCustomerInvoice}
					setFillCustomerData={setFillCustomerData}
					setIsEditInvoice={setIsEditInvoice}
					setIsChangeCurrency={setIsChangeCurrency}
					setShowAddRemarks={setShowAddRemarks}
					setShowChangePaymentMode={setShowChangePaymentMode}
				/>
			</div>

			{(invoice.services || []).length && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{isChangeCurrency ? (
				<ChangeCurrency
					isChangeCurrency={isChangeCurrency}
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showExchangeRate ? (
				<ExchangeRateModal
					showExchangeRate={showExchangeRate}
					setExchangeRate={setExchangeRate}
					invoice={invoice}
				/>
			) : null}

			{showAddRemarks ? (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showChangePaymentMode ? (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{updateCustomerInvoice ? (
				<UpdateCustomerInvoice
					show={updateCustomerInvoice}
					setShow={setUpdateCustomerInvoice}
					closeModal={() => setUpdateCustomerInvoice(false)}
					refetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{fillCustomerData ? (
				<FillCustomerPortalData
					show={fillCustomerData}
					closeModal={() => setFillCustomerData(false)}
					handleRefetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{addCustomerInvoice ? (
				<AddCustomerInvoice
					show={addCustomerInvoice}
					setShow={setAddCustomerInvoice}
					closeModal={() => setAddCustomerInvoice(false)}
					handleRefetch={handleRefetch}
					invoice={invoice}
					shipmentData={shipment_data}
				/>
			) : null}

		</div>
	);
}

export default Actions;
