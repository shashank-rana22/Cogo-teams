import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetAllotEntityBank from '../../hooks/useGetAllotEntityBank';

import AllotBankList from './AllotBankList';
import SendReportModal from './SendReportModal';
import UploadUTR from './UploadUTR';

function PayrunButtons({
	activePayrunTab, setActivePayrunTab = () => {}, isInvoiceView, overseasData,
	selectedPayrun = null, setSelectedPayrun = () => {}, checkedRow = null,
	setCheckedRow = () => {}, itemData = {}, activeEntity = '',
}) {
	const { allotEntityBank, allotEntityLoading, getEntityBank } = useGetAllotEntityBank({
		selectedPayrun, checkedRow,
	});
	const [showAllotBank, setShowAllotBank] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [showUploadUTR, setShowUploadUTR] = useState(false);

	if (activePayrunTab === 'AUDITED' && !isInvoiceView) {
		return (
			<div>
				<div>
					<Button disabled={isEmpty(checkedRow)} onClick={() => { setShowAllotBank(true); getEntityBank(); }}>
						ALLOT BANK
					</Button>
				</div>
				{showAllotBank ? (
					<AllotBankList
						selectedPayrun={selectedPayrun}
						showAllotBank={showAllotBank}
						setShowAllotBank={setShowAllotBank}
						checkedRow={checkedRow}
						setCheckedRow={setCheckedRow}
						setSelectedPayrun={setSelectedPayrun}
						allotEntityBank={allotEntityBank}
						allotEntityLoading={allotEntityLoading}
						setActivePayrunTab={setActivePayrunTab}
					/>
				) : null}
			</div>
		);
	}
	if (activePayrunTab === 'INITIATED' && !isInvoiceView) {
		return (
			<div>
				<Button disabled={isEmpty(checkedRow)}>
					Go To Audit
				</Button>
			</div>
		);
	}
	if (activePayrunTab === 'UPLOAD_HISTORY') {
		return (
			<div>
				<Button onClick={() => setShowUploadUTR(true)}>
					UPLOAD BULK UTR
				</Button>
				{showUploadUTR ? (
					<UploadUTR
						showUploadUTR={showUploadUTR}
						setShowUploadUTR={setShowUploadUTR}
						activeEntity={activeEntity}
					/>
				) : null }
			</div>
		);
	}
	if (activePayrunTab === 'PAID' && overseasData !== 'ADVANCE_PAYMRNT') {
		return (
			<div>
				<Button themeType="secondary" onClick={() => setShowReport(true)}>
					SEND REPORT
				</Button>
				{showReport ? (
					<SendReportModal
						showReport={showReport}
						setShowReport={setShowReport}
						activePayrunTab={activePayrunTab}
						itemData={itemData}
					/>
				) : null}
			</div>
		);
	}
}

export default PayrunButtons;
