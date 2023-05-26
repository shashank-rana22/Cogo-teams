import { SingleDateRange, Select, Button, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Filter from '../../../../commons/Filters';

import { CURRENCY, PAYMENT_STATUS, SHIPMENT_TYPE } from './constants';
import { defaultersControls } from './controls';
import defaultersCustomerFilters from './defaultersCustomerFilters';
import styles from './styles.module.css';

function DefaultersFilters({ globalFilters, setGlobalFilters, isCustomerView }) {
	const [visible, setVisible] = useState(false);

	const { general } = useSelector((state) => state || {});
	const partnerIds = general?.query?.partner_id;

	const control = isCustomerView
		? defaultersCustomerFilters()
		: [
			...defaultersControls()[
				Object.keys(GLOBAL_CONSTANTS.country_entity_ids).find(
					(key) => GLOBAL_CONSTANTS.country_entity_ids[key] === partnerIds,
				)
			],
		];

	const popoverContent = () => (
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

				<Select
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
					dateFormat="MM/dd/yyyy"
					name="invoiceDate"
					onChange={(e) => { setGlobalFilters((prev) => ({ ...prev, invoiceDate: e })); }}
					value={globalFilters?.invoiceDate}
					isPreviousDaysAllowed
					style={{ width: '200px' }}
				/>

				<SingleDateRange
					placeholder="Due Date"
					dateFormat="MM/dd/yyyy"
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

	return (
		<div>
			<div className={styles.filter_container}>
				<div style={{ width: '38%' }}>
					<Filter
						controls={control}
						filters={globalFilters}
						setFilters={setGlobalFilters}
					/>
				</div>
				<div>
					<Popover visible={visible} placement="bottom" render={popoverContent()}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setVisible(!visible)}
						>
							+ More Filters
						</Button>
					</Popover>
				</div>
			</div>
		</div>
	);
}

export default DefaultersFilters;
