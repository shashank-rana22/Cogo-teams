import { Pill, Button, Placeholder } from '@cogoport/components';
import React from 'react';

import ShowOverflowingNumber from '../../../utils/getShowOverFlowingNumbers';
// import RemarkModal from '../Content/RemarkModal';

import DocumentFlow from './DocumentFlow';
import styles from './styles.module.css';

const OVERFLOW_LIMIT = 8;

export default function BuySellStatusContent({
	data = {},
	loading = false,
	timeLineData = [],
}) {
	// const [buttonClicked, setButtonClicked] = useState('');
	// const [queryModalShow, setQueryModalShow] = useState(false);
	// const [remarkValue, setRemarkValue] = useState('');
	const {
		grand_total: income = '', document_number = '',
		trade_party = '', document_date = '', document_status = '',
	} = data || {};

	return (
		<>
			<div className={styles.parent_timeline}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>{document_number}</div>
					</div>
					<div>
						<div className={styles.regular}>Trade Party</div>
						<div>{trade_party}</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Date</div>
						<div>{document_date}</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Amt.</div>
						<div>{ShowOverflowingNumber(income, OVERFLOW_LIMIT, 'INR')}</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Status</div>
						<div><Pill color="#B4F3BE">{document_status}</Pill></div>
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
						// onClick={() => { setQueryModalShow(true); setButtonClicked('Query'); }}
					>
						Raise Query
					</Button>

					{/* <RemarkModal
						remarkValue={remarkValue}
						setRemarkValue={setRemarkValue}
						queryModalShow={queryModalShow}
						setQueryModalShow={setQueryModalShow}
						buttonClicked={buttonClicked}
						setButtonClicked={setButtonClicked}
						columnIndex={columnIndex}
						index={index}
						toggleAccordion={toggleAccordion}
					/> */}

					<Button
						size="md"
						themeType="primary"
						// onClick={() => { setQueryModalShow(true); setButtonClicked('Accept'); }}
					>
						Accept
					</Button>

					{/* <RemarkModal
						remarkValue={remarkValue}
						setRemarkValue={setRemarkValue}
						queryModalShow={queryModalShow}
						setQueryModalShow={setQueryModalShow}
						buttonClicked={buttonClicked}
						setButtonClicked={setButtonClicked}
						columnIndex={columnIndex}
						index={index}
						toggleAccordion={toggleAccordion}
					/> */}
				</div>
			</div>
		</>
	);
}
