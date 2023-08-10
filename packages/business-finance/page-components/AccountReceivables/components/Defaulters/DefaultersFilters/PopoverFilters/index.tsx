import { Button, MultiSelect, Select, SingleDateRange } from '@cogoport/components';

import { CURRENCY, PAYMENT_STATUS, SHIPMENT_TYPE } from '../constants';

import styles from './styles.module.css';

interface Global {
	status?:string,
	services?:string[],
	invoiceDate?:{ startDate?:Date, endDate?:Date },
	dueDate?:{ startDate?:Date, endDate?:Date },
	currency?:string,
}

interface Props {
	globalFilters?:Global,
	setGlobalFilters?:Function,
	setVisible?:Function
}

function PopoverFilters({ globalFilters, setGlobalFilters, setVisible }:Props) {
	return (
		<div className={styles.filter_popover}>
			<div className={styles.filter_section}>
				<Select
					value={globalFilters?.status}
					onChange={(e) => setGlobalFilters((prev) => ({ ...prev, status: e }))}
					placeholder="Payment Status"
					options={PAYMENT_STATUS}
					size="sm"
					isClearable
					style={{ width: '200px' }}
				/>

				<MultiSelect
					value={globalFilters?.services}
					onChange={(e) => setGlobalFilters((prev) => ({ ...prev, services: e }))}
					placeholder="Shipment Type"
					options={SHIPMENT_TYPE}
					size="sm"
					isClearable
					style={{ width: '200px' }}
				/>
			</div>

			<div className={styles.filter_section}>
				<SingleDateRange
					placeholder="Invoice Date"
					dateFormat="dd/MM/yyyy"
					name="invoiceDate"
					onChange={(e) => { setGlobalFilters((prev) => ({ ...prev, invoiceDate: e })); }}
					value={globalFilters?.invoiceDate}
					isPreviousDaysAllowed
					style={{ width: '200px' }}
				/>

				<SingleDateRange
					placeholder="Due Date"
					dateFormat="dd/MM/yyyy"
					name="dueDate"
					onChange={(e) => { setGlobalFilters((prev) => ({ ...prev, dueDate: e })); }}
					value={globalFilters?.dueDate}
					isPreviousDaysAllowed
					style={{ width: '200px' }}
				/>
			</div>

			<div className={styles.filter_section}>
				<Select
					value={globalFilters?.currency}
					onChange={(e) => setGlobalFilters((prev) => ({ ...prev, currency: e }))}
					placeholder="Currency"
					options={CURRENCY}
					size="sm"
					isClearable
					style={{ width: '200px' }}
				/>
			</div>

			<div className={styles.close_popover}>
				<Button onClick={() => setVisible(false)}>Close</Button>
			</div>

		</div>
	);
}

export default PopoverFilters;
