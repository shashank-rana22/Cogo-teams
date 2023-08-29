import { Modal, Button, Datepicker, ButtonIcon } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useState } from 'react';

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
	isDelete,
	setIsDelete,
	reRender,
	setReRender,

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
	// const [showStack, setShowStack] = useState(false);
	const updatedData = selectedData?.map((item) => ({ ...item })) || [];
	const {
		checkData,
		postPaymentsSettlementCheck,
	} = usePaymentsSettlementCheck({ selectedData: updatedData, date });
	// const [stackData, setStackData] = useState(checkData?.stackDetails || []);
	const [showDocument, setShowDocument] = useState(false);
	const [fileValue, setFileValue] = useState('');
	const onClick = () => {
		setShowDocument(true);
	};
	const onOuterClick = () => {
		setShowDocument(false);
	};

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
					<Button
						style={{ marginRight: '10px' }}
						onClick={() => onClick('primary sm')}
					>
						Upload File
					</Button>
					{showDocument && (
						<Modal
							show={showDocument}
							onClose={() => setShowDocument(false)}
							onOuterClick={onOuterClick}
							size="md"
						>
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
					{
                        dryRun && (
	<p style={{ fontSize: '10px' }}>Please refresh to dry run again !</p>
                        )
                    }
				</div>
				<div className={styles.refreshStyle}>

					<ButtonIcon
						style={{ height: '30px', alignItems: 'center' }}
						size="lg"
						icon={<IcMRefresh />}
						themeType="primary"
						onClick={() => {
							setDryRun(false);
							setReRender(true);
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
					<ListData
						selectedData={selectedData}
						setSelectedData={setSelectedData}
						stackData={checkData?.stackDetails}
						// stackData={stackData}
						// setStackData={setStackData}
						dryRun={dryRun}
						reRender={reRender}
						isDelete={isDelete}
						setIsDelete={setIsDelete}
						setReRender={setReRender}
						updatedData={updatedData}
					/>
				</Modal.Body>
				<Modal.Footer>

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
