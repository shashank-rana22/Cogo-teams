import { Button, Modal } from '@cogoport/components';

import useSendBookingPrefrenceEmail from '../../../../hooks/useSendBookingPrefrenceEmail';
import Card from '../RatesCard/Card';

import styles from './styles.module.css';

function SelectedRatesCard({
	prefrences, price, serviceData, setSellRates,
	sellRates, emailModal, setEmailModal, singleServiceSellRateDetails, shipmentData,
}) {
	const { emailTrigger } = useSendBookingPrefrenceEmail(
		singleServiceSellRateDetails,
		shipmentData?.id,
		shipmentData?.shipment_type,
	);

	return (
		<div className={styles.container}>
			<div className={styles.upper_section}>
				<div className={styles.heading}>
					Selected Rates
				</div>
				<div className={styles.text_container}>
					<div className={styles.text}>
						Consolidated Buy Price  :
						<span className={styles.key}> USD 910</span>
					</div>
					<div className={styles.text2}>
						Consolidated Profitability :
						<span className={styles.key}> 1.1 %</span>
					</div>
				</div>
				<div className={styles.mailButton}>
					{shipmentData?.shipment_type === 'fcl_freight' ? (
						<Button onClick={() => { setEmailModal(true); }} size="sm" theme="primary">
							Send Mail
						</Button>
					) : null}
				</div>
			</div>
			<div className={styles.lower_section}>
				{prefrences?.map((singleItem) => (
					<div key={singleItem}>
						<Card
							data={singleItem?.data}
							rate_key
							fromkey={singleItem?.key}
							price={price}
							serviceData={serviceData}
							setSellRates={setSellRates}
							sellRates={sellRates}
						/>
					</div>
				))}
			</div>

			<Modal size="md" show={emailModal} onClose={() => { setEmailModal(false); }} placement="top">
				<Modal.Header title="Send Confirmation Email" />
				<Modal.Body>
					Send Confirmation Email
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
