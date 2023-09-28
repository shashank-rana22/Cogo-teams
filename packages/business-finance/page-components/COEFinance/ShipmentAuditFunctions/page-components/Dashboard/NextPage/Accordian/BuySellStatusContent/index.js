import { Pill, Button } from '@cogoport/components';
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

export default function BuySellStatusContent({
	toggleAccordion,
	columnIndex,
	index,
}) {
	const [buttonClicked, setButtonClicked] = useState('');
	const [queryModalShow, setQueryModalShow] = useState(false);
	// const [acceptModalShow, setAcceptModalShow] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	// const [activeService, setActiveService] = useState('Service 1');
	// const servicesFromBackend = ['Service 1', 'Service 2', 'Service 3'];
	const data = [1, 2, 3, 4, 5, 6];
	// const handleServiceClick = (service) => {
	// 	setActiveService(service);
	// };
	// function onClose() {
	// 	setQueryModalShow(false);
	// 	setAcceptModalShow(false);
	// }
	// function handleRaiseQuery(columnIndex, index) {
	// 	toggleAccordion(columnIndex, index);
	// 	if (index != 5) {
	// 		toggleAccordion(columnIndex, index + 1);
	// 	}
	// 	setQueryModalShow(false);
	// }
	// function handleSubmit(columnIndex, index) {
	// 	toggleAccordion(columnIndex, index);
	// 	if (index != 5) {
	// 		toggleAccordion(columnIndex, index + 1);
	// 	}
	// 	setAcceptModalShow(false);
	// }
	return (
		<>

			<div className={styles.parent_timeline}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Trade Party</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Date</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Amt.</div>
						<div>{ShowOverflowingNumber(100000000000, 8, 'INR')}</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Status</div>
						<div><Pill color="#B4F3BE">Invoice Number</Pill></div>
					</div>
				</div>
				<div className={styles.scroll}>
					<div className={styles.timeline_heading}>Timeline</div>
					<div className={styles.timeline}>
						{data.map((item, index) => (
							<div key={index} style={{ width: '200px' }}>
								<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
									<IcCFtick height="20" width="20" />
									{item !== 6 ? (<div className={styles.horizontal_rule} />) : null}
								</div>
								<div>
									<div>Finance Accepted</div>
									<div>Data</div>
									<div>Data</div>
								</div>
							</div>
						))}
					</div>
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
