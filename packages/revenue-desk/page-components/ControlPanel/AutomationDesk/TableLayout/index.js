import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { columnTitle, list, NUMBERS } from '../../../common/columns';
import RowElement from '../../../common/RowElement';
import useCreateRDAutomationParameters from '../../hooks/useCreateRDAutomationParameters';
import useUpdateRDAutomationParameter from '../../hooks/useUpdateRDAutomationParameter';

import styles from './styles.module.css';

function TableLayout({
	filter = {},
	addWeightage = false, maxHeight = '', margin = '',
	openForm = false, setOpenForm = () => {},
	val = [],
	refetch = () => {},
}) {
	const [showWeight, setShowWeight] = useState(false);
	const [disabledInput, setDisabledInput] = useState(false);
	const { apiTrigger = () => {} } = useCreateRDAutomationParameters({ refetch });
	const { updateRDAutomationParameter } = useUpdateRDAutomationParameter({ refetch });
	const { service_type = '', shipment_parameters = {} } = val || {};
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
				<div>{startCase(service_type)}</div>
				<div className={styles.content_details}>
					<div className={styles.content}>
						Trade Type :
						{' '}
						{['fob', 'exw', 'fca', 'fas']?.includes(inco_term) ? 'Import' : 'Export'}
					</div>

					<div className={styles.content}>
						Container Type :
						{' '}
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
					<Button
						onClick={() => handelInActive(val?.id)}
						size="md"
						style={{	background: '#f9f9f9', color: '#000' }}
					>
						Mark InActive
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
