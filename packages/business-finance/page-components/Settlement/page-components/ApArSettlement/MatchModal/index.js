import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import usePaymentsSettlementCheck from '../../../hooks/usePaymentsSettlementCheck';
import CreateJvModal from '../../JournalVoucher/CreateJvModal/index';

import Header from './Header';
import getLineItems from './LineItems';
import ListData from './ListData';
import ConfirmSettle from './SettleConfirmationModal';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

export default function MatchModal({
	matchModalShow = false, setMatchModalShow = () => {},
	selectedData = [], filters = {}, setSelectedData = () => {},
	loading = false,
	isDelete = false, setIsDelete = () => {},
	reRender = false, setReRender = () => {},
	matchBal = 0, submitSettleMatch = () => {}, settleLoading = true,
	refetch = () => {}, setJvSearch = '',
}) {
	const { t = () => {} } = useTranslation(['settlement']);
	const [updateBal, setUpdateBal] = useState(matchBal);
	const [dryRun, setDryRun] = useState(false);
	const [showJV, setShowJV] = useState(false);
	const [updatedData, setUpdatedData] = useState(JSON.parse(JSON.stringify(selectedData)));
	const [date, setDate] = useState('');
	const [showDocument, setShowDocument] = useState(false);
	const [fileValue, setFileValue] = useState({});
	const [settleConfirmation, setSettleConfirmation] = useState(false);

	const {
		checkData = {}, postPaymentsSettlementCheck = () => {}, checkLoading = false,
		success = false, setSuccess = () => {},
	} = usePaymentsSettlementCheck({ selectedData: updatedData, date, t });

	const [canSettle, setCanSettle] = useState(checkData?.canSettle || false);
	const [checkedData, setCheckedData] = useState(checkData?.stackDetails || []);
	const dryRunData = (dryRun ? (checkData?.stackDetails) : []);
	function onClose() {
		setMatchModalShow(false);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		setCheckedData([]);
	}
	useEffect(() => {
		const SORTED_MS = updatedData?.map((item) => new Date(item?.transactionDate)?.getTime())?.sort();
		const LATEST_MS = SORTED_MS[GLOBAL_CONSTANTS.zeroth_index];
		setDate(new Date(LATEST_MS));
	}, [updatedData]);
	useEffect(() => {
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		if (selectedData.length === ZERO_VALUE) {
			setMatchModalShow(false);
		}
	}, [selectedData, setMatchModalShow]);

	useEffect(() => {
		setCheckedData(checkData?.stackDetails || []);
		setCanSettle(checkData?.canSettle || false);
	}, [checkData?.stackDetails, checkData?.canSettle]);

	useEffect(() => {
		if (success && !isEmpty(checkedData)) {
			setUpdatedData((prev) => checkedData || prev);
		} else {
			setSuccess(true);
		}
	}, [checkedData, setSuccess, success]);

	const LINE_ITEMS = getLineItems({ filters, updateBal });
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
				<Modal.Header title={(
					<Header
						updateBal={updateBal}
						selectedData={selectedData}
						showDocument={showDocument}
						setShowDocument={setShowDocument}
						setFileValue={setFileValue}
						setDryRun={setDryRun}
						postPaymentsSettlementCheck={postPaymentsSettlementCheck}
						setCheckedData={setCheckedData}
						setUpdatedData={setUpdatedData}
						setCanSettle={setCanSettle}
						setDate={setDate}
						updatedData={updatedData}
						setShowJV={setShowJV}
						date={date}
						dryRun={dryRun}
						fileValue={fileValue}
						checkLoading={checkLoading}
						t={t}
					/>
				)}
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
						setCanSettle={setCanSettle}
						loading={loading}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={!canSettle || !dryRun || settleLoading}
						onClick={() => setSettleConfirmation(true)}
					>
						{t('settlement:settle_btn')}
					</Button>
					{
						settleConfirmation
							? (
								<ConfirmSettle
									submitSettleMatch={submitSettleMatch}
									setSettleConfirmation={setSettleConfirmation}
									settleConfirmation={settleConfirmation}
									updatedData={updatedData}
									date={date}
									fileValue={fileValue}
									settleLoading={settleLoading}
									setMatchModalShow={setMatchModalShow}
									t={t}
									setJvSearch={setJvSearch}
								/>
							) : null
					}
				</Modal.Footer>
			</Modal>
			{showJV ? (
				<CreateJvModal
					show={showJV}
					setShow={setShowJV}
					onClose={() => setShowJV(false)}
					refetch={refetch}
					Entity={filters?.entityCode}
					selectedData={updatedData}
					line_items={LINE_ITEMS}
					setJvSearch={setJvSearch}
					setDryRun={setDryRun}
				/>
			) : null}
		</div>
	);
}
