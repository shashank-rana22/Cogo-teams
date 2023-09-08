import { Button, Placeholder } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useCreateRDAutomationParameters from '../../hooks/useCreateRDAutomationParameters';
import useUpdateRDAutomationParameter from '../../hooks/useUpdateRDAutomationParameter';

import RowElement from './RowElement';
import styles from './styles.module.css';

const NUMBERS = {
	ONE     : 1,
	HUNDRED : 100,
};
const columnTitle = ['variables', 'current weightage', 'Add weightage'];
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
function TableLayout({
	filter = {},
	addWeightage, maxHeight, margin,
	openForm, setOpenForm = () => {},
	val = [],
	refetch = () => {},
	loading = false,
}) {
	const [showWeight, setShowWeight] = useState(false);
	const [disabledInput, setDisabledInput] = useState(false);
	const { apiTrigger = () => {} } = useCreateRDAutomationParameters({ refetch });
	const { updateRDAutomationParameter } = useUpdateRDAutomationParameter({ refetch });
	const { trade_type = '', service_type = '', shipment_parameters = {} } = val || {};
	const { container_type = '', inco_term = '' } = shipment_parameters || {};
	const column_width = `${NUMBERS.HUNDRED / (columnTitle.length || NUMBERS.ONE)}%`;

	const handelField = (add) => {
		if (!add) { setDisabledInput(!disabledInput); }
	};

	const handelInActive = (id) => {
		updateRDAutomationParameter(id);
	};

	return (
		<div>
			<div className={styles.container} style={{ margin }}>
				{loading && <Placeholder height="50px" width="1250px" />}
				{!loading && (
					<>
						<div>{startCase(service_type)}</div>
						<div className={styles.content_details}>
							<div className={styles.content}>
								Trade Type :
								{startCase(trade_type)}
							</div>

							<div className={styles.content}>
								Container Type:
								{startCase(container_type)}
							</div>

							<div className={styles.content}>
								{startCase(inco_term)}
							</div>

							<Button onClick={() => setShowWeight(!showWeight)} size="md" themeType="secondary">
								{showWeight ? (
									<IcMArrowRotateDown
										style={{ marginRight: '10px' }}
									/>
								) : <IcMArrowRotateRight style={{ marginRight: '10px' }} />}
								VIEW WEIGHTAGE
							</Button>
							<Button onClick={() => handelInActive(val?.id)} size="md" themeType="secondary">
								InActive
							</Button>

						</div>
					</>
				)}
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
								{(item === 'Add weightage' && !addWeightage) ? (
									<Button
										themeType="secondary"
										onClick={() => handelField(addWeightage)}
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
						data={val?.weightages}
						columnTitle={columnTitle}
						column_width={column_width}
						filter={filter}
						apiTrigger={apiTrigger}
						disabledInput={disabledInput}
						maxHeight={maxHeight}
						deskValue={val}
						openForm={openForm}
						setOpenForm={setOpenForm}
						addWeightage={addWeightage}
					/>
				</div>
			)}
		</div>

	);
}

export default TableLayout;
