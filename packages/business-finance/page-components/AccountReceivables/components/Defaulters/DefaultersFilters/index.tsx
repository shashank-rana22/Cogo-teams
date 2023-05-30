import { SingleDateRange, Select, Button, Popover, Input, MultiSelect } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Filter from '../../../../commons/Filters';

import { CURRENCY, PAYMENT_STATUS, SHIPMENT_TYPE } from './constants';
import { defaultersControls } from './controls';
import styles from './styles.module.css';

function DefaultersFilters({ globalFilters, setGlobalFilters, isClear, clearFilters }) {
	const [visible, setVisible] = useState(false);

	const { general } = useSelector((state) => state || {});
	const partnerIds = general?.query?.partner_id;

	const control = [
		...defaultersControls({ globalFilters })[
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

	return (
		<div>
			<div className={styles.filter_container}>
				<div className={styles.left_filters}>
					<div>
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
								<span className={styles.icon}>
									<IcMFilter />
								</span>
							</Button>
						</Popover>
					</div>
					{!isClear && (
						<Button
							style={{ marginLeft: '8px' }}
							onClick={() => clearFilters()}
						>
							Clear Filters

						</Button>
					)}
				</div>
				<div className={styles.search}>
					<Input
						value={globalFilters?.search}
						onChange={(value) => { setGlobalFilters((prev:object) => ({ ...prev, search: value })); }}
						placeholder="Search by Customer Name /Invoice number /SID"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchlight height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default DefaultersFilters;
