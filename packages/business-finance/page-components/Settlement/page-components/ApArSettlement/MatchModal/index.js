import { Modal, Button, Datepicker, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useGetJVList from '../../../hooks/useGetJvsList';
import usePaymentsSettlementCheck from '../../../hooks/usePaymentsSettlementCheck';
import { getFormatAmount } from '../../../utils/getFormatAmount';
import CreateJvModal from '../../JournalVoucher/CreateJvModal/index.tsx';

import lineItems from './LineItems';
import ListData from './ListData';
import styles from './styles.module.css';
import UploadDocument from './UploadDocument';

const ZERO_VALUE = 0;

const handleSetTdsZero = (updatedData = [], setUpdatedData = () => {}) => {
	const updatedDataWithZeroTds = updatedData.map((item) => ({
		...item,
		allocationAmount : parseFloat(+item.allocationAmount) + parseFloat(+item.tds),
		balanceAmount    : +item.balanceAmount + +item.tds,
		tds              : 0,
	}));
	setUpdatedData(updatedDataWithZeroTds);
};

export default function MatchModal({
	matchModalShow = false, setMatchModalShow = () => {},
	selectedData = [], filters = {}, setSelectedData = () => {},
	isDelete = false, setIsDelete = () => {},
	reRender = false, setReRender = () => {},
	matchBal = 0, submitSettleMatch = () => {}, settleLoading = false,
}) {
	const [updateBal, setUpdateBal] = useState(matchBal);
	const [dryRun, setDryRun] = useState(false);
	const [showJV, setShowJV] = useState(false);
	const [updatedData, setUpdatedData] = useState(JSON.parse(JSON.stringify(selectedData)));
	const [date, setDate] = useState('');
	const [showDocument, setShowDocument] = useState(false);
	const [fileValue, setFileValue] = useState({});

	useEffect(() => {
		const sorted_ms = updatedData
			.map((item) => new Date(item.transactionDate).getTime())
			.sort();

		const latest_ms = sorted_ms[GLOBAL_CONSTANTS.zeroth_index];
		setDate(new Date(latest_ms));
	}, [updatedData]);

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
	}, [selectedData, setMatchModalShow]);

	useEffect(() => {
		setCheckedData(checkData?.stackDetails || []);
	}, [checkData]);

	useEffect(() => {
		if (success && checkedData?.length !== ZERO_VALUE) {
			setUpdatedData(checkedData || updatedData);
		} else {
			setSuccess(true);
		}
	}, [checkedData, success, setSuccess, setUpdatedData, updatedData]);

	const handleRefreshClick = async () => {
		setDryRun(false);
		setCheckedData([]);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
	};
	const line_items = lineItems(filters, updateBal);

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
		<div className={styles.header}>
			<span className={styles.supheader}>MATCHING</span>
			{' '}
			<span className={styles.subheader}>( Drag and drop to set the matching hierarchy )</span>
		</div>
		<br />

		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				Matching Balance
				<p className={styles.paragraph}>
					{/* {`${selectedData[GLOBAL_CONSTANTS.zeroth_index]?.currency}     ${updateBal}    `} */}
					{getFormatAmount(updateBal, selectedData[GLOBAL_CONSTANTS.zeroth_index]?.currency)}
				</p>
			</div>

			<div className={styles.btn_container}>
				<div className={styles.Datepicker}>
					<div style={{ margin: '0px 6px' }}>
						Settlement Date
					</div>

					<Datepicker
						placeholder="Enter Date"
						dateFormat="MM/dd/yyyy"
						name="date"
						onChange={(e) => { setDate(e); }}
						value={date}
					/>
				</div>

				<Button
					className={styles.btn}
					onClick={() => { handleSetTdsZero(updatedData, setUpdatedData); }}
					themeType="secondary"
				>
					Set TDS Zero
				</Button>

				<div>
					<Button
						className={styles.btn}
						onClick={() => onClick('primary sm')}
						themeType="secondary"
					>
						Upload File
					</Button>
					<p className={styles.optional}>(Optional)</p>
					{showDocument && (
						<UploadDocument
							showDocument={showDocument}
							setShowDocument={setShowDocument}
							onOuterClick={onOuterClick}
							fileValue={fileValue}
							setFileValue={setFileValue}
						/>
					)}
				</div>

				<Button
					className={styles.btn}
					themeType="secondary"
					onClick={() => setShowJV(true)}
				>
					CREATE JV
				</Button>

				<div className={styles.dryrun}>
					<Button
						className={styles.btn}
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
						<p className={styles.error}>Please refresh to dry run again !</p>
					)}
				</div>

				<div className={styles.refreshStyle}>
					<ButtonIcon
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
					<Button
						disabled={!(checkData?.canSettle) || !dryRun || settleLoading}
						onClick={() => submitSettleMatch({ updatedData, date, fileValue })}
					>
						Settle
					</Button>
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
