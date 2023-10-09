import { Pill, Button, Placeholder, Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import ShowOverflowingNumber from '../../../utils/getShowOverFlowingNumbers';
import RaiseTicketModal from '../../RaiseTicketModal';
import RemarkModal from '../../RemarkModal';

import DocumentFlow from './DocumentFlow';
import styles from './styles.module.css';

const OVERFLOW_LIMIT = 8;

export default function BuySellStatusContent({
	data = {},
	loading = false,
	timeLineData = [],
	getClosedTasks = () => {},
}) {
	const [buttonClicked, setButtonClicked] = useState('');
	const [queryModalShow, setQueryModalShow] = useState(false);
	const [showTicketModal, setShowTicketModal] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	const {
		grand_total: income = '', document_number = '',
		trade_party = '', document_date = '',
		document_status = '', id = '',
		quotation_state = '',
	} = data || {};

	return (
		<>
			<div className={styles.parent_timeline}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
					<div className={styles.invoice_container}>
						<div className={styles.regular}>Invoice Number</div>
						<div className={styles.regular_content}>{document_number}</div>
					</div>
					<Tooltip
						content={(
							<div className={styles.trade_party_container}>
								<div className={styles.regular}>Trade Party</div>
								<div className={styles.regular_content}>{trade_party}</div>
							</div>
						)}
						placement="top"
					>
						<div className={styles.trade_party_container}>
							<div className={styles.regular}>Trade Party</div>
							<div className={styles.regular_content}>{trade_party}</div>
						</div>
					</Tooltip>
					<div className={styles.invoice_date_container}>
						<div className={styles.regular}>Invoice Date</div>
						<div className={styles.regular_content}>{document_date}</div>
					</div>
					<div className={styles.invoice_amount_container}>
						<div className={styles.regular}>Invoice Amt.</div>
						<div className={styles.regular_content}>
							{ShowOverflowingNumber(income, OVERFLOW_LIMIT, 'INR')}
						</div>
					</div>
					<div className={styles.invoice_status_container}>
						<div className={styles.regular}>Invoice Status</div>
						<div className={styles.regular_content}><Pill color="#B4F3BE">{document_status}</Pill></div>
					</div>
				</div>
				<div className={styles.timeline_container}>
					<div className={styles.timeline_heading}>Timeline</div>
					{loading ? <Placeholder height="60px" /> : (
						<div className={styles.timeline}>
							<DocumentFlow timelineDetails={timeLineData} />
						</div>
					)}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '10px' }}
						onClick={() => setShowTicketModal(true)}
					>
						Raise Query
					</Button>

					{
						showTicketModal ? (
							<RaiseTicketModal
								setShowTicketModal={setShowTicketModal}
								showTicketModal={showTicketModal}
								itemData={data}
							/>
						) : null
					}

					{quotation_state !== 'APPROVED' && (
						<Button
							size="md"
							themeType="primary"
							onClick={() => { setQueryModalShow(true); setButtonClicked('Accept'); }}
						>
							Accept
						</Button>
					)}

					<RemarkModal
						remarkValue={remarkValue}
						setRemarkValue={setRemarkValue}
						queryModalShow={queryModalShow}
						setQueryModalShow={setQueryModalShow}
						buttonClicked={buttonClicked}
						setButtonClicked={setButtonClicked}
						id={id}
						getClosedTasks={getClosedTasks}
					/>
				</div>
			</div>
		</>
	);
}
