import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMArrowRotateDown,
	IcCError,
	IcMEdit,
} from '@cogoport/icons-react';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useRef } from 'react';

import Edit from '../Edit';
import ReviewCN from '../Review';

import LineItems from './LineItems';
import styles from './styles.module.css';

const CN_STATUS_MAPPING = {
	pending          : 'draft',
	reviewed         : 'requested',
	approved         : 'approved',
	rejected         : 'rejected',
	finance_rejected : 'finance_rejected',
};

function Item({
	item = {},
	cnRefetch = () => {},
	invoiceData = {},
	loading = false,
	invoicesList = [],
}) {
	const [open, setOpen] = useState('');

	const billingPartyHeightRef = useRef();

	const itemStatus = item?.status;

	const prevData = {
		remarks       : item?.remarks?.[GLOBAL_CONSTANTS.zeroth_index] || '',
		document_urls : item?.document_urls || [],
	};

	const bfInvoice = (invoicesList || []).filter((ele) => ele?.proformaNumber === item?.cn_number);

	const handleDownload = () => {
		const cnLink = bfInvoice[GLOBAL_CONSTANTS.zeroth_index]?.invoicePdfUrl
			? bfInvoice[GLOBAL_CONSTANTS.zeroth_index]?.invoicePdfUrl
			: bfInvoice[GLOBAL_CONSTANTS.zeroth_index]?.proformaPdfUrl;

		window.open(cnLink);
	};

	if (loading) {
		return (
			<div className={styles.loader_wrapper}>
				<ThreeDotLoader message="Loading Credit Notes" />
			</div>
		);
	}

	return (
		<>
			<main className={styles.main}>
				<div className={styles.header}>
					<div className={styles.billing_party} ref={billingPartyHeightRef}>
						<h5>{item?.billing_address?.name}</h5>

						<Tooltip
							theme="light"
							placement="bottom"
							content={(
								<div className={styles.billing_address}>
									{item?.billing_address?.address}
								</div>
							)}
						>
							<span className={styles.gst_number}>
								GST Number:
								{' '}
								<span>{item?.billing_address?.tax_number}</span>
							</span>
						</Tooltip>
					</div>

					<section className={styles.details}>
						<div className={styles.number}>
							<span
								onClick={!isEmpty(bfInvoice) ? handleDownload : null}
								className={item?.status === 'approved' ? styles.approved : undefined}
							>
								{item?.cn_number}
							</span>

							<span>{item?.live_invoice_number}</span>
						</div>

						<div className={styles.invoice_value}>
							Invoice Value -
							{' '}
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
								<div className={cl`${styles[CN_STATUS_MAPPING[itemStatus]]} ${styles.status_text}`}>
									{startCase(CN_STATUS_MAPPING[itemStatus])}
								</div>

								{itemStatus === 'rejected' ? (
									<IcCError width={16} height={16} />
								) : null}
							</div>

							{itemStatus === 'pending' ? (
								<Button
									size="sm"
									onClick={() => setOpen('review')}
								>
									Review
								</Button>
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
						onClick={() => setOpen(open !== 'line_items' ? 'line_items' : false)}
						tabIndex={0}
						role="button"
						style={{ height: `${billingPartyHeightRef.current?.offsetHeight}px` }}
					>
						<IcMArrowRotateDown className={open ? styles.rotate : null} />
					</section>
				</div>

				{open === 'line_items' ? (
					<div className={styles.line_items_container}>
						{(item?.services || []).map((_item) => (
							<LineItems
								key={_item?.service_id}
								item={_item}
								loading={loading}
							/>
						))}
					</div>
				) : null}
			</main>

			{open === 'review' ? (
				<ReviewCN
					setOpen={setOpen}
					id={item?.id}
					cnRefetch={cnRefetch}
				/>
			) : null}

			{open === 'edit' ? (
				<Edit
					setOpen={setOpen}
					prevData={prevData}
					CN_STATUS_MAPPING={CN_STATUS_MAPPING}
					item={item}
					cnRefetch={cnRefetch}
					invoiceData={invoiceData}
				/>
			) : null}
		</>
	);
}

export default Item;
