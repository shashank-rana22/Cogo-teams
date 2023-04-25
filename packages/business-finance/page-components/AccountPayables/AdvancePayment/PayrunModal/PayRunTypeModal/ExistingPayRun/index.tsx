import { Radio, Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import List from '../../../../../commons/List';

import { PaymentReadyConfig } from './paymentReadyTable';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import DateWithTime from './renderFunction/DateWithTime';
import InvoiceCount from './renderFunction/InvoiceCount';
import Ribbon from './renderFunction/Ribbon';
import styles from './styles.module.css';

interface DataTypes {
	list: object[];
	pageIndex?: number;
	totalPage?: number;
	totalRecords?: number;

}

interface FiltterProps {
	pageIndex?:number,
}
interface Props {
	exitPayRun:boolean,
	setExitPayRun:Function,
	data:DataTypes,
	loading:boolean,
	filters:FiltterProps,
	setFilters:Function,
	currency:string,
	activeEntity:string,
}

function ExitingPayRun({
	exitPayRun,
	setExitPayRun,
	data,
	loading,
	filters,
	setFilters,
	currency,
	activeEntity,
}:Props) {
	const { pageIndex } = data || {};
	const { push } = useRouter();
	const [value, setValue] = useState('');

	// const handleClick = () => (
	// 	push('/business-finance/account-payables/advance-payment/add-into-existing-payrun')
	// );
	const handleClick = () => (
		push(`/business-finance/account-payables/advance-payment/create-new-payrun?selectedPayRunId=${value}
		&currency=${currency}&entity=${activeEntity}`)
	);

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
						handlePageChange={(val: number) => setFilters({
							...filters,
							pageIndex: val,
						})}
						rowStyle="border"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => { setExitPayRun(false); }}>Cancel</Button>
					<div className={styles.button}>
						<Button onClick={handleClick}>Confirm</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ExitingPayRun;
