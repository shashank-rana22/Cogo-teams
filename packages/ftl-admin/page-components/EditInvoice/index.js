import { CreatableSelect, Modal, Button, Toast, cl } from '@cogoport/components';
import React, { useState, useEffect, useMemo } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useListShipmentInvoicePreferences from '../../hooks/useListShipmentInvoicePreferences';
import useUpdateShipmentInvoice from '../../hooks/useUpdateShipmentInvoice';

import { EditInvoiceIndex } from './context';
import { EDIT_INVOICE_REMARK_OPTIONS } from './editInvoiceRemarkOptions';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

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
