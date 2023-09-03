import { Modal, Button, Datepicker, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useGetJVList from '../../../hooks/useGetJvsList';
import usePaymentsSettlementCheck from '../../../hooks/usePaymentsSettlementCheck';
import CreateJvModal from '../../JournalVoucher/CreateJvModal/index.tsx';

import lineItems from './LineItems';
import ListData from './ListData';
import styles from './styles.module.css';
import UploadFile from './UploadDocument';

const ZERO_VALUE = 0;
export default function MatchModal({
	matchModalShow = false, setMatchModalShow = () => {},
	selectedData = [], filters = [], setSelectedData = () => {},
	isDelete = false, setIsDelete = () => {},
	reRender = false, setReRender = () => {},
	matchBal,
}) {
	const [updateBal, setUpdateBal] = useState(matchBal);
	const [date, setDate] = useState('');
	const [dryRun, setDryRun] = useState(false);
	const [showJV, setShowJV] = useState(false);
	const [updatedData, setUpdatedData] = useState(JSON.parse(JSON.stringify(selectedData)));
	const [showDocument, setShowDocument] = useState(false);
	const [fileValue, setFileValue] = useState('');
	const {
		checkData, postPaymentsSettlementCheck, checkLoading,
		success, setSuccess,
	} = usePaymentsSettlementCheck({ selectedData: updatedData, date });
	const [checkedData, setCheckedData] = useState(checkData?.stackDetails);
	const dryRunData = (dryRun ? (checkData?.stackDetails) : []);
	const {
		jvListRefetch,
	} = useGetJVList({ filters });
	function onClose() {
		setMatchModalShow(false);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		setCheckedData([]);
	}
	const onClick = () => {
		setShowDocument(true);
	};
	const onOuterClick = () => {
		setShowDocument(false);
	};
	const handleDryRunClick = async () => {
		setDryRun(true);
		await postPaymentsSettlementCheck();
	};
	useEffect(() => {
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		if (selectedData.length === ZERO_VALUE) {
			setMatchModalShow(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedData]);
	useEffect(() => {
		setCheckedData(checkData?.stackDetails || []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkData]);
	useEffect(() => {
		if (success && checkedData?.length !== ZERO_VALUE) {
			setUpdatedData(checkedData || updatedData);
		} else {
			setSuccess(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkedData]);
	const handleRefreshClick = async () => {
		setDryRun(false);
		setCheckedData([]);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
	};
	const line_items = lineItems(filters, updateBal);
	const handleSetTdsZero = () => {
		const updatedDataWithZeroTds = updatedData.map((item) => ({
			...item,
			allocationAmount : parseFloat(+item.allocationAmount) + parseFloat(+item.tds),
			balanceAmount    : +item.balanceAmount + +item.tds,
			tds              : 0,
		}));
		setUpdatedData(updatedDataWithZeroTds);
	};
	return (
		<div>
			<Modal
				size="xl"
				className={styles.container}
				show={matchModalShow}
				onClose={() => onClose()}
				onOuterClick={() => onClose()}
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
					{`${selectedData[GLOBAL_CONSTANTS.zeroth_index]?.currency}     ${updateBal}    `}
				</p>
			</div>
			<div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '20px' }}>
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
						onClick={() => { handleSetTdsZero(); }}
					>
						set tds zero
					</Button>
				</div>
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
							onClose={() => { setShowDocument(false); }}
							onOuterClick={onOuterClick}
							size="md"
						>
							<Modal.Body>
								<UploadFile
									fileValue={fileValue}
									setFileValue={setFileValue}
								/>
							</Modal.Body>
							<Modal.Footer>

								<Button
									style={{ marginRight: '6px' }}
									onClick={() => { setShowDocument(false); }}
								>
									Upload
								</Button>
								<Button onClick={() => { setShowDocument(false); setFileValue(''); }}>Cancel</Button>
							</Modal.Footer>
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
						onClick={() => {
							handleDryRunClick();
						}}
					>
						DRY RUN
					</Button>
					{dryRun
					&& (
						<p style={{ fontSize: '10px' }}>Please refresh to dry run again !</p>
					)}
				</div>
				<div className={styles.refreshStyle}>

					<ButtonIcon
						style={{ height: '30px', alignItems: 'center' }}
						size="lg"
						icon={<IcMRefresh />}
						themeType="primary"
						onClick={() => {
							handleRefreshClick();
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
						checkedData={checkedData}
						setCheckedData={setCheckedData}
						dryRun={dryRun}
						setDryRun={setDryRun}
						reRender={reRender}
						setReRender={setReRender}
						isDelete={isDelete}
						setIsDelete={setIsDelete}
						updatedData={updatedData}
						setUpdatedData={setUpdatedData}
						dryRunData={dryRunData}
						checkLoading={checkLoading}
						setUpdateBal={setUpdateBal}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={!(checkData?.canSettle) || !dryRun} onClick={() => onClose()}>Settle</Button>
				</Modal.Footer>
			</Modal>
			{showJV && (
				<CreateJvModal
					show={showJV}
					setShow={setShowJV}
					onClose={() => setShowJV(false)}
					refetch={jvListRefetch}
					Entity={filters?.entityCode}
					selectedData={updatedData}
					line_items={line_items}
				/>
			)}
		</div>
	);
}
