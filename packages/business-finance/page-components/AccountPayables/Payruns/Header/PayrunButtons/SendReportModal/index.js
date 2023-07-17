import { Button, Modal, SingleDateRange, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import useGetPaidBillReport from '../../../hooks/useGetPaidBillReport';

const NEXT_MONTH_INDEX = 1;
function SendReportModal({
	showReport = false, setShowReport = () => {}, globalFilters = {},
	activePayrunTab = '', itemData = {},
}) {
	const [newdate, setNewDate] = useState(false);
	const {
		sendInvoiceReport,
		sendReportLoading,
	} = useGetPaidBillReport({
		size: itemData?.totalRecords,
		globalFilters,
		newdate,
		setNewDate,
		setShowReport,
		activePayrunTab,
	});

	return (
		<div>
			<Modal size="sm" show={showReport} onClose={() => setShowReport(false)} placement="top">
				<Modal.Header title="Paid Invoices Report" />
				<Modal.Body>
					<SingleDateRange
						name="date"
						size="sm"
						value={newdate}
						placeholder="Select Date Range"
						isPreviousDaysAllowed
						onChange={(dat) => {
							const { startDate, endDate } = dat;
							const startingDate = new Date(startDate);
							if (
								new Date(endDate) > startingDate.setMonth(startingDate.getMonth() + NEXT_MONTH_INDEX)
							) {
								Toast.error('Please select a range less then a month');
								setNewDate('Invalid_Range');
							} else {
								setNewDate(dat);
							}
						}}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						onClick={() => setShowReport(false)}
						style={{ marginRight: '16px' }}
					>
						Cancel

					</Button>
					<Button
						onClick={() => {
							sendInvoiceReport(newdate);
						}}
						disabled={sendReportLoading}
					>
						{sendReportLoading ? 'Sending...' : 'Send Report'}
					</Button>

				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SendReportModal;
