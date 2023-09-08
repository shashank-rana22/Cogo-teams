import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateRDAutomationParameters from '../../hooks/useCreateRDAutomationParameters';

import RowElement from './RowElement';
import styles from './styles.module.css';

function Details({ deskValue, addWeightage, margin, openForm, setOpenForm = () => {}, maxHeight, refetch = () => {} }) {
	const NUMBERS = {
		ONE     : 1,
		HUNDRED : 100,
	};
	const columnTitle = ['variables', 'Add weightage'];
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

	const [showWeight, setShowWeight] = useState(false);
	const { apiTrigger = () => {} } = useCreateRDAutomationParameters({ refetch });
	const column_width = `${NUMBERS.HUNDRED / (columnTitle.length || NUMBERS.ONE)}%`;

	return (
		<>
			<div className={styles.container} style={{ margin }}>
				<div className={styles.content_details}>
					<div className={styles.content}>
						Trade Type :
						{' '}
						{startCase(deskValue?.trade_type)}
					</div>

					<div className={styles.content}>
						Container Type:
						{' '}
						{deskValue?.container_type}
					</div>

					<div className={styles.content}>
						{deskValue?.inco_term}
					</div>

					<Button onClick={() => setShowWeight(!showWeight)} size="md" themeType="secondary">
						{showWeight ? (
							<IcMArrowRotateDown
								style={{ marginRight: '10px' }}
							/>
						) : <IcMArrowRotateRight style={{ marginRight: '10px' }} />}
						ADD WEIGHTAGE
					</Button>
				</div>
			</div>

			{showWeight && (
				<div className={styles.list}>
					<div className={styles.tableheader}>
						{columnTitle.map((item) => (
							<div
								key={item?.id}
								style={{ width: column_width }}
								className={styles.tableheader_item}
							>
								{item}
							</div>
						))}
					</div>
					<RowElement
						list={list}
						columnTitle={columnTitle}
						column_width={column_width}
						apiTrigger={apiTrigger}
						maxHeight={maxHeight}
						deskValue={deskValue}
						openForm={openForm}
						setOpenForm={setOpenForm}
						addWeightage={addWeightage}
					/>
				</div>
			)}
		</>

	);
}

export default Details;
