import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetAllotEntityBank from '../../hooks/useGetAllotEntityBank';
import useGetInvoiceListDownload from '../../hooks/useGetInvoiceListDownload';

import AllotBankList from './AllotBankList';
import SendReportModal from './SendReportModal';
import UploadUTR from './UploadUTR';

function PayrunButtons({
	activePayrunTab, isInvoiceView, overseasData = '', globalFilters = {},
	selectedPayrun = null, setSelectedPayrun = () => {}, checkedRow = null,
	setCheckedRow = () => {}, itemData = {}, activeEntity = '', refetch = () => {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	const { allotEntityBank, allotEntityLoading, getEntityBank } = useGetAllotEntityBank({
		selectedPayrun, checkedRow,
	});
	const { downloadInvoice, loading } = useGetInvoiceListDownload({
		overseasData,
		activePayrunTab,
		globalFilters,
		size: itemData?.totalRecords,
	});
	const [showAllotBank, setShowAllotBank] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [showUploadUTR, setShowUploadUTR] = useState(false);
	const allotBankDisabledCondition = isEmpty(selectedPayrun) && isEmpty(checkedRow);
	if (activePayrunTab === 'AUDITED' && !isInvoiceView) {
		return (
			<div>
				<div>
					<Button
						disabled={allotBankDisabledCondition}
						onClick={() => { setShowAllotBank(true); getEntityBank(); }}
					>
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
						overseasData={overseasData}
						refetch={refetch}
						selectedIds={selectedIds}
						setSelectedIds={setSelectedIds}
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
						refetch={refetch}
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
	if (['PAYMENT_INITIATED', 'COMPLETED'].includes(activePayrunTab) && isInvoiceView) {
		return (
			<div>
				<Button size="sm" onClick={downloadInvoice} disabled={loading}>
					{loading ? 'Generating' : 'Download'}
				</Button>
			</div>
		);
	}
}

export default PayrunButtons;
