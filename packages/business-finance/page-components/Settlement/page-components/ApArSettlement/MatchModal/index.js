import { Modal, Button, Datepicker, Table, FileSelect, ButtonIcon } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetMatchingColumns from '../../../configurations/ap-ar-settlement/selected-data-column';
import usePaymentsSettlementCheck from '../../../hooks/usePaymentsSettlementCheck';

import styles from './styles.module.css';

export default function MatchModal({
	matchModalShow,
	setMatchModalShow,
	totalMatchingBalance,
	selectedData,
	setSelectedData,
	// sortData,
	// setSortData,
	loading,

}) {
	function onClose() {
		setMatchModalShow(false);
	}

	const INDEX = 0;
	const [date, setDate] = useState('');
	const [dryRun, setDryRun] = useState(false);
	// console.log(selectedData[0]);
	const [fileValue, setFileValue] = useState('');
	const {
		checkData,
		postPaymentsSettlementCheck,
	} = usePaymentsSettlementCheck({ selectedData, date });

	const colo = useGetMatchingColumns(
		// data,
		// loading,
		selectedData,
		setSelectedData,
		// sortBy,
		// setSortBy,
		// sortType,
		// setSortType,
		// arrowDirections,
		// setArrowDirections,
		// sortData,
		// setSortData,
	);
	return (

		<Modal
			size="xl"
			className={styles.container}
			show={matchModalShow}
			onClose={() => onClose()}
			placement="center"
			scroll
		>
			<Modal.Header title={
                (
	<>
		<div>
			MATCHING
			{' '}
			<sub>( Drag and drop to set the matching hierarchy )</sub>
		</div>
		<br />
		<div style={{ display: 'flex', alignItems: 'center' }}>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				Matching Balance
				{/* {'     '} */}
				<p style={{
					color        : '#F68B21',
					marginLeft   : '4px',
					display      : 'flex',
					alignItems   : 'center',
					marginBottom : '0px',
				}}
				>
					{`${selectedData[INDEX]?.currency}     ${totalMatchingBalance}    `}
					{/* {totalMatchingBalance} */}
				</p>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
				<span className={styles.Datepicker}>
					<p style={{ margin: '0px 6px' }}>
						Settlement Date
					</p>

					<Datepicker
						placeholder="Enter Date"
					// showTimeSelect
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={(e) => { setDate(e); }}
						value={date}
					/>
				</span>
				<div>
					<div style={{ display: 'block', alignItems: 'center', marginRight: '6px' }}>
						{/* <p /> */}
						<FileSelect
							className={styles.uploadStyle}
							value={fileValue}
							onChange={setFileValue}
							type="button"
							multiple={false}
						/>
						{/* <ProgressBar /> */}
					</div>
				</div>
				<div style={{ marginRight: '6px' }}>
					<Button size="md" themeType="secondary">CREATE JV</Button>
				</div>
				<div style={{ marginRight: '6px' }}>
					<Button
						size="md"
						themeType="secondary"
						disabled={dryRun}
						onClick={() => { setDryRun(true); postPaymentsSettlementCheck(); }}
					>
						DRY RUN

					</Button>
				</div>
				<div className={styles.refreshStyle}>

					<ButtonIcon
						style={{ height: '30px', alignItems: 'center' }}
						size="lg"
						icon={<IcMRefresh />}
						themeType="primary"
						onClick={() => { setDryRun(false); }}
					/>
				</div>
			</div>
		</div>
	</>
			)
        }
			/>

			<Modal.Body>
				<Table className={styles.tableStyle} columns={colo} data={selectedData} loading={loading} />
			</Modal.Body>
			<Modal.Footer>
				<Button style={{ marginRight: '10px' }} onClick={() => onClose()}>Cancel</Button>

				<Button disabled={!(checkData?.canSettle)} onClick={() => onClose()}>Settle</Button>
			</Modal.Footer>
		</Modal>
	);
}
// style={{ width: '1200px', height: '650px' }}
