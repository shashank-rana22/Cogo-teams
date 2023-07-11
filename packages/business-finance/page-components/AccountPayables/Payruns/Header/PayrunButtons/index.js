import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AllotBankList from './AllotBankList';

function PayrunButtons({ activePayrunTab, isInvoiceView, overseasData, selectedPayrun, setSelectedPayrun }) {
	const [showAllotBank, setShowAllotBank] = useState(false);
	if (activePayrunTab === 'AUDITED' && !isInvoiceView) {
		return (
			<div>
				<div>
					<Button disabled={isEmpty(selectedPayrun)} onClick={() => setShowAllotBank(true)}>
						ALLOT BANK
					</Button>
				</div>
				{showAllotBank ? (
					<AllotBankList
						selectedPayrun={selectedPayrun}
						showAllotBank={showAllotBank}
						setShowAllotBank={setShowAllotBank}
						setSelectedPayrun={setSelectedPayrun}
					/>
				) : null}
			</div>
		);
	}
	if (activePayrunTab === 'INITIATED' && !isInvoiceView) {
		return (
			<div>
				<Button>
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
