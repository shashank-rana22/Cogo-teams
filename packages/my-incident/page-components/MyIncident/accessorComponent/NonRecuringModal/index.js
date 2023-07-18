import { Tooltip, Textarea, Modal, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import StyledTable from '../../Table/index.tsx';
import { toTitleCase } from '../../utils';
import ApproveAndRejectHeader from '../ApproveAndRejectHeader/index.tsx';

import { overheadsConfig } from './overheadsConfig.ts';
import styles from './style.module.css';

const DEFAULT_REMARK_LEN = 40;

function NonRecuringModal({
	onSave = () => {},
	itemData = {},
	loadingOnSave = false,
}) {
	const [showModal, setShowModal] = useState(false);

	const [remarks, setRemarks] = useState('');
	const { data } = itemData || {};
	const { overheadConfirmationRequest, organization } = data;
	const {
		invoiceNumber,
		subTotalAmount,
		taxTotalAmount,
		grandTotalAmount,
		lineItems,
		ledgerGrandTotal,
		ledgerCurrency,
		remarks: remarkData,
		billCurrency: currency,
		documents,
		branchName,
		categoryName,
		expenseType,
	} = overheadConfirmationRequest || {};

	const { businessName } = organization || {};

	const { referenceId = '' } = itemData || {};

	const incidentMappings = [
		{
			key   : 'Invoice number',
			value : invoiceNumber,
		},
		{ key: 'Category Name', value: categoryName },
		{ key: 'Branch Name', value: branchName },
		{
			key   : 'SubTotal',
			value : formatAmount({
				amount  : subTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'TaxAmount',
			value : formatAmount({
				amount  : taxTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'GrandTotal',
			value : formatAmount({
				amount  : grandTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'Ledger GrandTotal',
			value : formatAmount({
				amount   : ledgerGrandTotal,
				currency : ledgerCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
	];

	return (
		<div>
			<div>
				<Button
					themeType="secondary"
					onClick={() => {
						setShowModal(true);
					}}
				>
					View
				</Button>
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => setShowModal(false)}
				>
					<Modal.Header
						title={`Expense Approval - ${toTitleCase(
							businessName,
						)} (${toTitleCase(
							expenseType ? startCase(expenseType) : '',
						)}) ${referenceId}`}
					/>
					<Modal.Body>
						<ApproveAndRejectHeader row={itemData} />

						<div className={styles.flex}>
							{incidentMappings?.map((item) => (
								<div
									className={styles.value_data}
									key={item.key}
								>
									<div className={styles.label_value}>
										{item?.key || '-'}
									</div>
									<div className={styles.date_value}>
										{item?.value || '-'}
									</div>
								</div>
							))}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Remarks -</div>
							{remarkData?.length > DEFAULT_REMARK_LEN ? (
								<Tooltip
									className={styles.tooltip}
									interactive
									content={remarkData || '-'}
								>
									<div className={styles.wrapper}>
										{remarkData || '-'}
									</div>
								</Tooltip>
							) : (
								remarkData || '-'
							)}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documents?.map((url) => (url !== '' ? (
								<a
									href={url}
									target="_blank"
									rel="noreferrer"
									key={url}
								>
									<div className={styles.view_flex}>
										<div className={styles.view}>
											View Document
										</div>
										<IcMEyeopen />
									</div>
								</a>
							) : (
								<div key={url}> No document available</div>
							)))}
						</div>
						{!isEmpty(lineItems) ? (
							<div className={styles.list_container}>
								<StyledTable
									columns={overheadsConfig}
									data={lineItems}
								/>
							</div>
						) : (
							<div className={styles.line_item_empty}>
								No LineItems Available
							</div>
						)}
						<div className={styles.remarks}>Remarks*</div>

						<Textarea
							name="remark"
							size="md"
							placeholder="Enter Remark Here..."
							onChange={(value) => setRemarks(value)}
							style={{
								width        : '700',
								height       : '100px',
								marginBottom : '12px',
							}}
						/>
					</Modal.Body>
					<div className={styles.button}>
						<Button
							themeType="secondary"
							size="md"
							style={{ marginRight: '8px' }}
							disabled={(isEmpty(remarks)) || loadingOnSave}
							onClick={onSave}
						>
							Save
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
}
export default NonRecuringModal;
