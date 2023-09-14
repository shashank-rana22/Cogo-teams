import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { list } from '../../../common/columns';
import RowElement from '../../../common/RowElement';
import useCreateRDAutomationParameters from '../../hooks/useCreateRDAutomationParameters';

import styles from './styles.module.css';

function Details({
	deskValue = {},
	addWeightage = false, margin = '', openForm = false, setOpenForm = () => {}, maxHeight = '', refetch = () => {},
}) {
	const NUMBERS = {
		ONE     : 1,
		HUNDRED : 100,
	};
	const columnTitle = ['variables', 'Add weightage'];

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
						{startCase(deskValue?.container_type)}
					</div>

					<div className={styles.content}>
						{startCase(deskValue?.inco_term)}
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
