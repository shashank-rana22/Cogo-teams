import { Pill, Button, Placeholder } from '@cogoport/components';
import {
	IcCFtick,
	//  IcCFcrossInCircle
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShowOverflowingNumber from '../../../../../utils/getShowOverFlowingNumbers';
// import List from '../Content/ItemList';
import RemarkModal from '../Content/RemarkModal';
// import Services from '../Content/Services';

import styles from './styles.module.css';

const SIX = 6;
const OVERFLOW_LIMIT = 8;

export default function BuySellStatusContent({
	toggleAccordion = () => {},
	columnIndex = '',
	index = '',
	data = {},
	loading = false,
	timeLineData = {},
}) {
	const [buttonClicked, setButtonClicked] = useState('');
	const [queryModalShow, setQueryModalShow] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	const {
		grand_total: income = '', document_number = '',
		trade_party = '', document_date = '', status = '',
	} = data || {};
	const { timelineDetail = [] } = timeLineData;

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
						<div><Pill color="#B4F3BE">{status}</Pill></div>
					</div>
				</div>
				<div className={styles.timeline_container}>
					<div className={styles.timeline_heading}>Timeline</div>
					{loading ? <Placeholder height="60px" /> : (
						<div className={styles.timeline}>
							{timelineDetail.map((item) => (
								<div key={item?.occurredAt} style={{ width: '200px' }}>
									<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
										<IcCFtick height="20" width="20" />
										{item !== SIX ? (<div className={styles.horizontal_rule} />) : null}
									</div>
									<div>
										<div>{item?.eventName}</div>
										<div>{item?.occurredAt}</div>
									</div>
								</div>
							))}
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
						onClick={() => { setQueryModalShow(true); setButtonClicked('Query'); }}
					>
						Raise Query
					</Button>

					<RemarkModal
						remarkValue={remarkValue}
						setRemarkValue={setRemarkValue}
						queryModalShow={queryModalShow}
						setQueryModalShow={setQueryModalShow}
						// setAcceptModalShow={setAcceptModalShow}
						buttonClicked={buttonClicked}
						setButtonClicked={setButtonClicked}
						columnIndex={columnIndex}
						index={index}
						toggleAccordion={toggleAccordion}
					/>

					<Button
						size="md"
						themeType="primary"
						onClick={() => { setQueryModalShow(true); setButtonClicked('Accept'); }}
					>
						Accept
					</Button>

					<RemarkModal
						remarkValue={remarkValue}
						setRemarkValue={setRemarkValue}
						queryModalShow={queryModalShow}
						setQueryModalShow={setQueryModalShow}
						// setAcceptModalShow={setAcceptModalShow}
						buttonClicked={buttonClicked}
						setButtonClicked={setButtonClicked}
						columnIndex={columnIndex}
						index={index}
						toggleAccordion={toggleAccordion}
					/>
				</div>
			</div>
		</>
	);
}
