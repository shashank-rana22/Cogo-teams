import { Loader, Button, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowRotateDown,
	IcCError,
	IcMEdit,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EditCN from '../Edit';
import ReviewCN from '../Review';

import LineItems from './LineItems';
import styles from './styles.module.css';

const CNstatusMapping = {
	pending          : 'draft',
	reviewed         : 'requested',
	approved         : 'approved',
	rejected         : 'rejected',
	finance_rejected : 'finance_rejected',
};

function Item({
	item = {},
	serial_id = '',
	refetch = () => {},
	invoiceData = {},
	loading = false,
	invoicesList = [],
}) {
	const [open, setOpen] = useState('');

	const itemStatus = item?.status;

	const prevData = {
		remarks       : item?.remarks[0] || '',
		document_urls : item?.document_urls || [],
	};

	const bfInvoice = invoicesList.filter((ele) => ele?.proformaNumber === item?.cn_number) || [];

	const handleDownload = () => {
		const cnLink = bfInvoice[0].invoicePdfUrl
			? bfInvoice[0].invoicePdfUrl
			: bfInvoice[0].proformaPdfUrl;

		window.open(cnLink);
	};

	if (loading) {
		return (
			<>
				<Loader />
				<Loader />
				<Loader />
			</>
		);
	}

	const title = (
		<>
			<section className={styles.billing_party}>
				<h3>{item?.billing_address?.name}</h3>
				<Tooltip
					theme="light"
					interactive
					content={(
						<div style={{ fontSize: '10px' }}>
							{item?.billing_address?.address}
						</div>
					)}
				>
					<span className={styles.gst_number}>
						<span>GST Number:&nbsp;</span>
						<span>{item?.billing_address?.tax_number}</span>
					</span>
				</Tooltip>
			</section>
			<section className={styles.details}>
				<div className={styles.number}>
					<span onClick={!isEmpty(bfInvoice) ? handleDownload : null}>{item?.cn_number}</span>
					<span>{item?.live_invoice_number}</span>
				</div>
				<div className={styles.invoice_value}>
					Invoice Value - &nbsp;
					<span>
						{formatAmount({
							amount   : item?.invoice_value,
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</span>
				</div>
				<div className={styles.invoice_status_and_action}>
					<div className={styles.status}>
						{itemStatus === 'rejected' ? (
							<IcCError width={16} height={16} />
						) : null}
						<div className={`${styles[CNstatusMapping[itemStatus]]} ${styles.status_text}`}>
							{startCase(CNstatusMapping[itemStatus])}
						</div>
					</div>
					{itemStatus === 'pending' ? (
						<div>
							<Button
								size="sm"
								onClick={() => setOpen('review')}
							>
								Review
							</Button>
						</div>
					) : null}
				</div>

				{itemStatus === 'pending' ? (
					<div
						onClick={() => setOpen('edit')}
						role="button"
						tabIndex={0}
						className={styles.actions}
					>
						<IcMEdit />
					</div>
				) : null}

			</section>
			<section
				className={styles.rotate_icon}
				onClick={() => setOpen(!open)}
				tabIndex={0}
				role="button"
			>
				<IcMArrowRotateDown className={open ? styles.rotate : null} />
			</section>
		</>
	);

	return (
		<>
			<main className={styles.main}>
				<div className={styles.header}>
					{title}
				</div>
				{open ? (
					(item?.services || []).map((_item) => (
						<LineItems
							item={_item}
							loading={loading}
						/>
					))
				) : null}
			</main>

			{open === 'review' ? (
				<ReviewCN
					setOpen={setOpen}
					id={item?.id}
					refetch={refetch}
				/>
			) : null}

			{open === 'edit' ? (
				<EditCN
					setOpen={setOpen}
					prevData={prevData}
					CNstatusMapping={CNstatusMapping}
					serial_id={serial_id}
					item={item}
					refetch={refetch}
					invoiceData={invoiceData}
				/>
			) : null}
		</>
	);
}

export default Item;
