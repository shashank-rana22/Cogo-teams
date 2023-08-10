import { Checkbox, Tooltip, Pill, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMInfo } from '@cogoport/icons-react';
import { useContext, useState } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
} from '../../../common/ShipmentCard';
import { EditInvoiceIndex } from '../context';

import styles from './styles.module.css';

const getShipmentKey = (shipment) => `${shipment?.id}@${shipment?.serial_id}`;
const getInvoiceKey = (shipmentId, invoiceNumber, invoiceId) => `${shipmentId}@${invoiceNumber}#${invoiceId}`;

const isAllInvoicesSelected = (shipmentData, selectedInvoices) => selectedInvoices
	.has(getShipmentKey(shipmentData))
		&& [...(selectedInvoices.get(getShipmentKey(shipmentData)) || new Map())
			.keys()].length === shipmentData?.invoice_combinations?.length;

const isInvoiceSelected = ({
	selectedInvoices,
	shipmentData, invoiceId,
}) => selectedInvoices.has(getShipmentKey(shipmentData))
		&& (selectedInvoices.get(getShipmentKey(shipmentData)) || new Map())?.has(invoiceId);

function Card({ data = {}, isSelectable = false }) {
	const [openAccordian, setOpenAccordian] = useState(false);
	const { selectedInvoices, setSelectedInvoices } = useContext(EditInvoiceIndex);

	const handleInvoiceClick = (e, invoice) => {
		if (e?.target?.checked) {
			if (selectedInvoices?.has(getShipmentKey(data))) {
				selectedInvoices.get(getShipmentKey(data))
					?.set(getInvoiceKey(data?.id, invoice?.invoice_number, invoice?.id), invoice);
			} else {
				selectedInvoices.set(
					getShipmentKey(data),
					new Map([[getInvoiceKey(data?.id, invoice?.invoice_number, invoice?.id), invoice]]),
				);
			}
		} else selectedInvoices?.get(getShipmentKey(data))?.delete(getInvoiceKey(data?.idinvoice?.invoice_number));
		setSelectedInvoices(new Map(selectedInvoices));
	};

	return (
		<div
			className={styles.container}
		>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
					{!!isSelectable && (
						<Checkbox
							checked={isAllInvoicesSelected(data, selectedInvoices)}
							onChange={(e) => {
								if (e?.target?.checked) {
									selectedInvoices.set(getShipmentKey(data), new Map(
										data?.invoice_combinations
											?.map((invoice) => [
												getInvoiceKey(data?.id, invoice?.invoice_number, invoice?.id),
												invoice,
											]),
									));
								} else selectedInvoices.delete(getShipmentKey(data));
								setSelectedInvoices(new Map(selectedInvoices));
							}}
						/>
					)}
					<div>
						<BasicDetails data={data} />

						<AssignedStakeholder data={data} />
					</div>
				</div>

				<div className={styles.divider} />

				<div className={styles.icon_container}>
					<ShipmentIcon shipment_type={data?.shipment_type} />
				</div>

				<div className={styles.location_container}>
					<DualLocation data={data} />
				</div>

				<div className={styles.divider} />

				<div className={styles.pill_container}>
					<CargoPills data={data} />
					{data?.fm_rejection_reason && (
						<Tooltip
							content={(
								<div className={styles.rejection_tooltip}>
									{data?.fm_rejection_reason}
								</div>
							)}
							placement="top"
						>
							<div style={{ marginBlock: 'auto' }}>
								<IcMInfo
									width={15}
									height={15}
									style={{ marginBottom: '2px', color: 'red' }}
								/>
							</div>
						</Tooltip>
					)}
				</div>
			</div>
			<div className={styles.accordian_control}>
				{!openAccordian ? (
					<IcMArrowRotateDown
						style={{ marginBottom: '10px' }}
						onClick={() => setOpenAccordian(true)}
					/>
				) : (
					<div className={styles.accordian_body}>
						<div style={{ textAlign: 'center', borderBottom: '1px solid #f5dede' }}>
							<IcMArrowRotateUp
								style={{ marginBottom: '10px' }}
								onClick={() => setOpenAccordian(false)}
							/>

						</div>
						{data?.invoice_combinations?.map((invoice) => (
							<div key={invoice?.id} className={styles.invoice_card}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									{!!isSelectable && (
										<Checkbox
											checked={
												isInvoiceSelected({
													shipmentData : data,
													selectedInvoices,
													invoiceId    : getInvoiceKey(
														data?.id,
														invoice?.invoice_number,
														invoice?.id,
													),
												})
											}
											onChange={(e) => handleInvoiceClick(e, invoice)}
										/>
									)}

									<div className={styles.bold}>{invoice?.invoice_number}</div>
								</div>
								<div>
									Invoice Value:
									{' '}
									<span className={styles.bold}>
										{invoice?.invoice_currency}
										{' '}
										{invoice?.inr_invoice_total}

									</span>

								</div>
								<div>
									Status:
									{' '}
									<span className={cl`${styles.bold} ${styles.capitalize}`}>{invoice?.status}</span>
								</div>
								<div>
									<span className={cl`${styles.bold} ${styles.capitalize}`}>
										{ invoice?.edit_invoice ? 'Editable' : 'Not Editable'}
									</span>
								</div>
								<div className={styles.capitalize}>
									Payment Mode:
									{' '}
									<Pill size="lg" color="green">
										<span className={styles.bold} style={{ color: '#5a4242' }}>
											{invoice?.payment_mode}
										</span>
									</Pill>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Card;
