import { CreatableSelect, Modal, Button, Toast, cl } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListShipmentInvoicePreferences from '../../hooks/useListShipmentInvoicePreferences';
import useUpdateShipmentInvoice from '../../hooks/useUpdateShipmentInvoice';

import { EditInvoiceIndex } from './context';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

const EDIT_INVOICE_REMARK_OPTIONS = [
	{
		label : 'Contracted rate is applicable on Quotation Booking',
		value : 'Contracted rate is applicable on Quotation Booking',
	},
	{
		label : 'Min Guarantee is based on Material Type & there is a change in Material Type',
		value : 'Min Guarantee is based on Material Type & there is a change in Material Type',
	},
	{
		label : 'Truck Type is updated',
		value : 'Truck Type is updated',
	},
	{
		label : 'Material Type is updated',
		value : 'Material Type is updated',
	},
	{
		label : 'Charged Weight is updated as per actual loading',
		value : 'Charged Weight is updated as per actual loading',
	},
	{
		label : 'Wrong Charge Code was selected during Checkout Quotation',
		value : 'Wrong Charge Code was selected during Checkout Quotation',
	},
	{
		label : 'Convenience Fee is to be removed from Checkout Quotation (Contracted Booking)',
		value : 'Convenience Fee is to be removed from Checkout Quotation (Contracted Booking)',
	},
	{
		label : 'Convenience Fee is to be removed from Checkout Quotation (Ad-hoc Booking)',
		value : 'Convenience Fee is to be removed from Checkout Quotation (Ad-hoc Booking)',
	},
	{
		label : 'Fuel Surcharge is to be removed from Checkout Quotation',
		value : 'Fuel Surcharge is to be removed from Checkout Quotation',
	},
	{
		label: `Only Freight 
		Charge (inclusive of Convenience & Fuel Surcharges) is required by the Customer in 1 Sales Invoice`,
		value: `Only Freight 
		Charge (inclusive of Convenience & Fuel Surcharges) is required by the Customer in 1 Sales Invoice`,
	},
	{
		label : 'Incidental Charges like loading & loading detention is to be added in 1 Sales Invoice',
		value : 'Incidental Charges like loading & loading detention is to be added in 1 Sales Invoice',
	},
];

function EditInvoice() {
	const [selectedInvoices, setSelectedInvoices] = useState(new Map());
	const [showModal, setShowModal] = useState(false);
	const [remarks, setRemarks] = useState({});

	const {
		loading,
		getInvoices,
		data: invoices,
		setFilters,
	} = useListShipmentInvoicePreferences();
	const { updatingInvoices, udpateInvoices } = useUpdateShipmentInvoice();

	const contextValue = useMemo(
		() => ({ selectedInvoices, setSelectedInvoices }),
		[selectedInvoices, setSelectedInvoices],
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (Object.values(remarks || {}).some((remark) => !remark)) {
			Toast.error('Remarks are required');
			return;
		}

		const val = new FormData(e?.target);
		const payload = Array.from(val?.entries())?.reduce((acc, [invoiceId, remark]) => (
			[...acc, {
				invoice_combination_id : invoiceId?.split('@')?.pop()?.split('#')?.pop(),
				edit_reason            : remark,
				shipment_id            : invoiceId?.split('@')?.shift(),
			}]), []);

		udpateInvoices({
			invoice_edit_remarks : payload,
			edit_invoice         : true,
		}, () => { getInvoices(); setShowModal(false); });
	};

	const handleDisableInvoices = () => {
		const payload = [...(selectedInvoices?.entries() || [])]
			?.reduce((acc, shipment) => {
				const invoiceMap = shipment?.pop() || new Map();
				const invoicePayload = [...(invoiceMap?.values() || [])]?.map((invoice) => ({
					invoice_combination_id : invoice?.id,
					shipment_id            : invoice?.shipment_id,
				}));
				return [...acc, ...invoicePayload];
			}, []);

		udpateInvoices({
			invoice_edit_remarks : payload,
			edit_invoice         : false,
		}, () => { getInvoices(); setShowModal(false); setRemarks({}); });
	};

	useEffect(() => {
		setSelectedInvoices(new Map());
	}, [invoices]);

	return (
		<div>
			<SearchShipment
				setFilters={setFilters}
				keyName="serial_id"
			/>
			{loading
				? <Loader />
				: (
					<EditInvoiceIndex.Provider value={contextValue}>
						<ShipmentList
							data={invoices}
							loading={loading}
							setFilters={setFilters}
							setShowModal={(val) => { setShowModal(val); setRemarks({}); }}
							handleDisableInvoices={handleDisableInvoices}
						/>
					</EditInvoiceIndex.Provider>
				)}

			{!!showModal && (
				<Modal
					show={showModal}
					placement="top"
					size="xl"
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title="Provide Remark" />
					<form onSubmit={handleSubmit}>
						<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
							<div className={styles.remark_wrapper}>
								<span className={cl`${styles.serial_id} ${styles.bold}`}>
									Serial No.
								</span>
								<span className={cl`${styles.invoice_id} ${styles.bold}`}>
									Invoice No.
								</span>
								<span className={styles.bold}>Remark</span>
							</div>

							{[...(selectedInvoices?.entries() || [])]?.reduce((acc, [shipmentKey, invoicesMap]) => {
								const row = ([...(invoicesMap?.keys() || [])])?.map((invoiceId) => (
									<div key={`remark_row_${shipmentKey}`} className={styles.remark_wrapper}>
										<span className={cl`${styles.serial_id} ${styles.bold}`}>
											{shipmentKey.split('@')?.pop()}
										</span>
										<span className={cl`${styles.invoice_id} ${styles.bold}`}>
											{invoiceId?.split('@')?.pop()?.split('#')?.shift()}
										</span>
										<CreatableSelect
											name={invoiceId}
											options={EDIT_INVOICE_REMARK_OPTIONS}
											style={{ width: '100%' }}
											placeholder="Select Remark"
											onChange={(e) => setRemarks(
												{ ...remarks, [shipmentKey.split('@')?.pop()]: e },
											)}
											value={remarks[shipmentKey.split('@')?.pop()]}
											required
										/>
									</div>
								));
								acc.push(row);
								return acc;
							}, [])}
						</Modal.Body>

						<Modal.Footer>
							<div className={styles.actions}>
								<div className={styles.cancel}>
									<Button
										onClick={() => setShowModal(false)}
										disabled={updatingInvoices}
										themeType="secondary"
									>
										Cancel
									</Button>
								</div>

								<div>
									<Button
										disabled={updatingInvoices}
										type="submit"
										themeType="accent"
									>
										Submit
									</Button>
								</div>
							</div>
						</Modal.Footer>
					</form>
				</Modal>
			)}
		</div>
	);
}

export default EditInvoice;
