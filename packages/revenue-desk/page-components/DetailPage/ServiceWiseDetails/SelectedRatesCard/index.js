import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useSendBookingPrefrenceEmail from '../../../../hooks/useSendBookingPrefrenceEmail';
import Card from '../RatesCard/Card';

import styles from './styles.module.css';

function SelectedRatesCard({
	prefrences, price, serviceData, setSellRates,
	sellRates, emailModal, setEmailModal, singleServiceSellRateDetails, shipmentData,
}) {
	const [showFullList, setShowFullList] = useState(false);
	const initialCardCount = 4;
	const { emailTrigger } = useSendBookingPrefrenceEmail(
		singleServiceSellRateDetails,
		shipmentData?.id,
	);
	const toggleList = () => {
		setShowFullList(!showFullList);
	};
	const renderedCards = showFullList ? prefrences : prefrences?.slice(0, initialCardCount);
	const expandable = prefrences?.length > initialCardCount;
	return (
		<div className={styles.container}>
			<div className={styles.upper_section}>
				<div className={styles.heading}>
					Selected Rates
				</div>
				{/* <div className={styles.text_container}>
					<div className={styles.text}>
						Consolidated Buy Price  :
						<span className={styles.key}> USD 910</span>
					</div>
					<div className={styles.text2}>
						Consolidated Profitability :
						<span className={styles.key}> 1.1 %</span>
					</div>
				</div> */}
				<div className={styles.mailButton}>
					{serviceData?.service_type === 'fcl_freight_service' ? (
						<Button onClick={() => { setEmailModal(true); }} size="sm" theme="primary">
							Send Mail
						</Button>
					) : null}
				</div>
			</div>
			<div className={styles.lower_section}>
				{renderedCards?.map((singleItem, index) => (
					<div key={singleItem?.rate_id}>
						<Card
							data={singleItem?.data}
							rate_key="selected_rate"
							fromkey={singleItem?.key}
							price={price}
							serviceData={serviceData}
							setSellRates={setSellRates}
							sellRates={sellRates}
							priority_no={index + 1}
						/>
					</div>
				))}
				<div style={{ display: 'flex', justifyContent: 'end' }}>
					{!showFullList && expandable && prefrences?.length > initialCardCount && (
						<Button size="md" themeType="link" onClick={toggleList}>See More</Button>
					)}

					{showFullList && (
						<Button size="md" themeType="link" onClick={toggleList}>See Less</Button>
					)}
				</div>
			</div>

			<Modal size="md" show={emailModal} onClose={() => { setEmailModal(false); }} placement="top">
				<Modal.Header title="Send Confirmation Email" />
				<Modal.Body>
					Are You Sure ?
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.modalFooter}>

						<Button
							style={{ marginLeft: '4px' }}
							themeType="secondary"
							onClick={() => { setEmailModal(false); }}
						>
							Cancel

						</Button>
						<Button onClick={() => { emailTrigger(); }}>Send</Button>
					</div>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default SelectedRatesCard;
