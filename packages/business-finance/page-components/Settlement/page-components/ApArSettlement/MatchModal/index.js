import { Modal, Button, Datepicker, ButtonIcon } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useState } from 'react';

// import useGetMatchingColumns from '../../../configurations/ap-ar-settlement/selected-data-column';
import useGetJVList from '../../../hooks/useGetJvsList';
import usePaymentsSettlementCheck from '../../../hooks/usePaymentsSettlementCheck';
import CreateJvModal from '../../JournalVoucher/CreateJvModal/index.tsx';

import ListData from './ListData';
import styles from './styles.module.css';
import UploadFile from './UploadDocument';

export default function MatchModal({
	matchModalShow,
	setMatchModalShow,
	totalMatchingBalance,
	selectedData,
	filters,
	setSelectedData,

}) {
	function onClose() {
		setMatchModalShow(false);
	}

	const {
		jvListRefetch,
	} = useGetJVList({ filters });
	const INDEX = 0;
	const [date, setDate] = useState('');
	const [dryRun, setDryRun] = useState(false);

	const [showJV, setShowJV] = useState(false);
	const {
		checkData,
		postPaymentsSettlementCheck,
	} = usePaymentsSettlementCheck({ selectedData, date });
	const [showDocument, setShowDocument] = useState(false);
	const [fileValue, setFileValue] = useState('');
	const onClick = () => {
		setShowDocument(true);
	};
	const onOuterClick = () => {
		setShowDocument(false);
	};

	// const colo = useGetMatchingColumns(
	// data,
	// loading,
	// selectedData,
	// setSelectedData,
	// sortBy,
	// setSortBy,
	// sortType,
	// setSortType,
	// arrowDirections,
	// setArrowDirections,
	// sortData,
	// setSortData,
	// );
	const line_items = [{
		entityCode   : filters?.entityCode || '',
		accMode      : filters?.accMode || '',
		glCode       : '',
		tradePartyId : filters?.tradeParty || '',
		type         : 'CREDIT',
		amount       : totalMatchingBalance || '',
	},
	{
		entityCode   : filters?.entityCode || '',
		accMode      : filters?.accMode || '',
		glCode       : '',
		tradePartyId : filters?.tradeParty || '',
		type         : 'DEBIT',
		amount       : totalMatchingBalance || '',
	},
	];

	// const [updatedData, setUpdatedData] = useState([...selectedData]);
	// const handleRefresh = () => {
	// 	setUpdatedData([...selectedData]);
	// };
	// console.log('change');
	// useEffect(() => {
	// 	// if (!isEditMode) {
	// 	// handleEditAllocation();
	// 	// }
	// 	// updatedData = selectedData.map((item) => ({ ...item }));
	// }, [reRender]);
	// console.log(selectedData, 'shpw');
	return (
		<div>
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
				</p>
			</div>
			<div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '80px' }}>
				<span className={styles.Datepicker}>
					<p style={{ margin: '0px 6px' }}>
						Settlement Date
					</p>

					<Datepicker
						placeholder="Enter Date"
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={(e) => { setDate(e); }}
						value={date}
					/>
				</span>
				<div>
					{/* <div style={{ display: 'block', alignItems: 'center', marginRight: '6px' }}>
						<FileSelect
							className={styles.uploadStyle}
							value={fileValue}
							onChange={setFileValue}
							type="card"
							multiple={false}
						/>
					</div> */}
					<Button
						style={{ marginRight: '10px' }}
						onClick={() => onClick('primary sm')}
					>
						Upload File
					</Button>
					{/* <OptionalTag>(optional)</OptionalTag> */}
					{showDocument && (
						<Modal
							show={showDocument}
							onClose={() => setShowDocument(false)}
							onOuterClick={onOuterClick}
							size="md"
						>
							{/* <Modal.Header>
								Upload File
							</Modal.Header> */}
							<Modal.Body>
								<UploadFile
									showDocument={showDocument}
									setShowDocument={setShowDocument}
									fileValue={fileValue}
									setFileValue={setFileValue}
								/>
							</Modal.Body>
						</Modal>
					)}
				</div>
				<div style={{ marginRight: '6px' }}>
					<Button size="md" themeType="secondary" onClick={() => setShowJV(true)}>CREATE JV</Button>
				</div>
				<div
					style={{
						marginRight   : '6px',
						display       : 'flex',
						flexDirection : 'column',
						flexWrap      : 'wrap',
						width         : '90px',
					}}
				>
					<Button
						size="md"
						themeType="secondary"
						disabled={dryRun}
						onClick={() => { setDryRun(true); postPaymentsSettlementCheck(); }}
					>
						DRY RUN

					</Button>
					{/* <p> */}
					{
                        dryRun && (
	<p style={{ fontSize: '10px' }}>Please refresh to dry run again !</p>
                        )
                    }
					{/* </p> */}
				</div>
				<div className={styles.refreshStyle}>

					<ButtonIcon
						style={{ height: '30px', alignItems: 'center' }}
						size="lg"
						icon={<IcMRefresh />}
						themeType="primary"
						onClick={() => {
							setDryRun(false);
						}}
					/>
				</div>
			</div>
		</div>
	</>
				)
        }
				/>

				<Modal.Body>
					{/* <Table
					className={styles.tableStyle}
					columns={colo}
					data={selectedData}
					loading={loading}
				/> */}
					<ListData
						selectedData={selectedData}
						setSelectedData={setSelectedData}
						// reRender={reRender}
					/>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button style={{ marginRight: '10px' }} onClick={() => onClose()}>Cancel</Button> */}

					<Button disabled={!(checkData?.canSettle)} onClick={() => onClose()}>Settle</Button>
				</Modal.Footer>
			</Modal>

			{showJV && (
				<CreateJvModal
					show={showJV}
					setShow={setShowJV}
					onClose={() => setShowJV(false)}
					refetch={jvListRefetch}
					Entity={filters?.entityCode}
					selectedData={selectedData}
					line_items={line_items}
				/>
			)}
		</div>
	);
}
