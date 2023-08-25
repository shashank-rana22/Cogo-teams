import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { SHOW_DOWNLOAD_BUTTON_TAB_NAME } from '../../constants';
import useGetAllotEntityBank from '../../hooks/useGetAllotEntityBank';
import useGetInvoiceListDownload from '../../hooks/useGetInvoiceListDownload';

import AllotBankList from './AllotBankList';
import styles from './styles.module.css';
import UploadUTR from './UploadUTR';

function PayrunButtons({
	activePayrunTab = '',
	isInvoiceView = false,
	overseasData = '',
	globalFilters = {},
	selectedPayrun = null,
	setSelectedPayrun = () => {},
	checkedRow = null,
	setCheckedRow = () => {},
	itemData = {},
	activeEntity = '',
	refetch = () => {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	const { push } = useRouter();

	const handleClick = () => {
		push(`/business-finance/account-payables/audit/${checkedRow.id}`);
	};
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
	const [showUploadUTR, setShowUploadUTR] = useState(false);

	const allotBankDisabledCondition = isEmpty(selectedPayrun) && isEmpty(checkedRow);

	if (activePayrunTab === 'AUDITED' && !isInvoiceView) {
		return (
			<div>
				<Button
					type="button"
					className={styles.upload_button}
					disabled={allotBankDisabledCondition}
					onClick={() => { setShowAllotBank(true); getEntityBank(); }}
				>
					ALLOT BANK
				</Button>
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
				<Button className={styles.upload_button} disabled={isEmpty(checkedRow)} onClick={handleClick}>
					Go To Audit
				</Button>
			</div>
		);
	}
	if (activePayrunTab === 'UPLOAD_HISTORY') {
		return (
			<div>
				<Button onClick={() => setShowUploadUTR(true)} className={styles.upload_button}>
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

	if ((SHOW_DOWNLOAD_BUTTON_TAB_NAME).includes(activePayrunTab) && isInvoiceView) {
		return (
			<div>
				<Button onClick={downloadInvoice} disabled={loading}>
					{loading ? 'Generating' : 'Download'}
				</Button>
			</div>
		);
	}

	return null;
}

export default PayrunButtons;
