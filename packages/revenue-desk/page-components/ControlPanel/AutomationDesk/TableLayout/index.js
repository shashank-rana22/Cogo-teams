import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import RowElement from './RowElement';
import styles from './styles.module.css';

const NUMBERS = {
	ONE     : 1,
	HUNDRED : 100,
};
const columnTitle = ['variables', 'current weightage', 'edit weightage'];
const list = [
	{ key: 'preferred_shipping_line', label: 'Preferred Shipping Line' },
	{ key: 'same_port_same_customer', label: 'Same Customer in Last 5 Shipments' },
	{ key: 'same_customer', label: 'Different port, same SP' },
	{ key: 'preferred_supplier', label: 'Preferred Supplier' },
	{ key: 'monthly_active_booking', label: 'Active Shipment' },
	{ key: 'allocation_ratio', label: 'Allocation Ratio' },
	{ key: 'overall_weightage', label: 'Fulfillment Ratio' },
	{ key: 'overall_weightage_2_day', label: 'Ratio 2 Day' },
	{ key: 'overall_weightage_7_day', label: 'Ratio 7 Day' },
	{ key: 'overall_weightage_30_day', label: 'Ratio 30 Day' },
	{ key: 'threshold', label: 'Profitability Cutoff' },
	{ key: 'weightage_override_cuttoff', label: 'Weightage Override Cutoff' },
];
function TableLayout({ data = {}, filter = {}, apiTrigger = () => {} }) {
	const [showWeight, setShowWeight] = useState(false);
	const [disabledInput, setDisabledInput] = useState(false);
	const column_width = `${NUMBERS.HUNDRED / (columnTitle.length || NUMBERS.ONE)}%`;

	return (
		<div>

			<div className={styles.container}>
				{/* <div>{startCase(service_type)}</div> */}
				<div>FCL</div>

				<div className={styles.content_details}>
					<div className={styles.content}>
						Trade Type : IMPORT
					</div>

					<div className={styles.content}>
						Origin Location : JEBEL ALI
					</div>

					<div className={styles.content}>
						Destination Location : TTMMDDD
					</div>

					<Button onClick={() => setShowWeight(!showWeight)} themeType="secondary">
						{showWeight ? (
							<IcMArrowRotateDown
								style={{ marginRight: '10px' }}
							/>
						) : <IcMArrowRotateRight style={{ marginRight: '10px' }} />}
						View Weightage
					</Button>
				</div>

			</div>
			{showWeight && (
				<div className={styles.list}>
					<div className={styles.tableheader}>
						{columnTitle.map((item) => (
							<div
								key={item}
								style={{ width: column_width }}
								className={styles.tableheader_item}
							>
								{item === 'edit weightage' ? (
									<Button
										themeType="secondary"
										onClick={() => setDisabledInput(!disabledInput)}
									>
										<IcMEdit style={{ marginRight: '10px' }} />
										EDIT WEIGHTAGE
									</Button>
								) : item}
							</div>
						))}
					</div>
					<RowElement
						list={list}
						data={data}
						columnTitle={columnTitle}
						column_width={column_width}
						filter={filter}
						refetch={apiTrigger}
						disabledInput={disabledInput}
					/>
				</div>
			)}
		</div>
	);
}

export default TableLayout;
