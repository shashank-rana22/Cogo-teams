import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetAllotEntityBank from '../../hooks/useGetAllotEntityBank';

import AllotBankList from './AllotBankList';

function PayrunButtons({
	activePayrunTab, setActivePayrunTab = () => {}, isInvoiceView, overseasData,
	selectedPayrun = null, setSelectedPayrun = () => {}, checkedRow = null,
	setCheckedRow = () => {},
}) {
	const { allotEntityBank, allotEntityLoading, getEntityBank } = useGetAllotEntityBank({
		selectedPayrun, checkedRow,
	});
	const [showAllotBank, setShowAllotBank] = useState(false);
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
			<Button>
				UPLOAD BULK UTR
			</Button>
		);
	}
	if (activePayrunTab === 'PAID' && overseasData !== 'ADVANCE_PAYMRNT') {
		return (
			<Button themeType="secondary">
				SEND REPORT
			</Button>
		);
	}
}

export default PayrunButtons;
