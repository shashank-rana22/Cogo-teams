import { Radio, Modal, Toast, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import List from '../../../../../commons/List';
import EmptyState from '../../../../../commons/StyledTable/EmptyState';

import { PaymentReadyConfig } from './paymentReadyTable';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import DateWithTime from './renderFunction/DateWithTime';
import InvoiceCount from './renderFunction/InvoiceCount';
import Ribbon from './renderFunction/Ribbon';
import styles from './styles.module.css';

function ExitingPayRun({
	exitPayRun,
	setExitPayRun,
	data,
	loading,
	filters,
	setFilters,
	currency,
	activeEntity,
}) {
	const { push } = useRouter();
	const { pageIndex, list = [] } = data || {};
	const listLength = list.length;
	const [value, setValue] = useState('');

	const handleClick = () => {
		push(`/business-finance/account-payables/advance-payment/create-new-payrun?selectedPayRunId=${value}
		&currency=${currency}&entity=${activeEntity}`);

		setExitPayRun(false);
		Toast.success('PayRun Initialised, Please wait...');
	};

	const functions = {
		renderRadio: (itemData) => {
			const { id } = itemData || {};
			const handleRadioChange = () => {
				if (value) {
					setValue('');
					setValue(id);
				} else {
					setValue(id);
				}
			};
			return (
				<div>
					<Radio
						name="select"
						checked={value === id}
						onChange={handleRadioChange}
					/>
				</div>
			);
		},
		renderRibbon: (itemData) => (
			<Ribbon itemData={itemData} />
		),
		renderAmountWithCurrency: (itemData) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderInvoiceCount: (itemData) => (
			<InvoiceCount itemData={itemData} />
		),
		renderDateWithTime: (itemData) => (
			<DateWithTime itemData={itemData} />
		),
	};
	return (
		<div>
			<Modal size="xl" show={exitPayRun} onClose={() => { setExitPayRun(false); }} placement="top">
				<Modal.Header title="Payment Ready PayRuns" />
				<Modal.Body>
					{listLength > 0 ? (
						<>
							<div className={styles.header}>
								Select a pay run you want to add to.
							</div>
							<List
								config={PaymentReadyConfig}
								itemData={data}
								loading={loading}
								functions={functions}
								page={pageIndex}
								pageSize={10}
								handlePageChange={(val) => setFilters({
									...filters,
									pageIndex: val,
								})}
								rowStyle="border"
							/>
						</>
					)
						:					<EmptyState imageFind="NoInoiceFound" imgHeight="imageHeight" />}
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						disabled={loading}
						onClick={() => { setExitPayRun(false); }}
					>
						Cancel

					</Button>
					<div className={styles.button}>
						<Button
							onClick={handleClick}
							disabled={value === '' || loading}
						>
							Confirm

						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ExitingPayRun;
