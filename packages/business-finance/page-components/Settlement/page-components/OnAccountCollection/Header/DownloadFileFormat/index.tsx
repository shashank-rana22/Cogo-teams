import { Button, Modal, Stepper } from '@cogoport/components';
import { useState } from 'react';

import { stepperItemsDownloadFileFormat } from '../../../../Constants';
import { UploadFileInterface } from '../../interface';

import styles from './styles.module.css';
import TradeParty from './TradeParty';

function DownloadFileFormat({ showModal, setShowModal, control, watch }:UploadFileInterface) {
	const [stepper, setStepper] = useState('tradeParty');
	const [value, onChange] = useState('AP');
	const [valueTradeParty, setValueTradeParty] = useState([]);

	const tradePartyName = watch('tradePartyId');

	return (
		<div>
			<Modal
				show={showModal.download_format}
				size="lg"
				placement="center"
				closeOnOuterClick={false}
				onClose={() => setShowModal({ download_format: false })}
			>
				<Modal.Header title="Download File Format" />

				<Stepper
					active={stepper}
					setActive={(val:string) => { setStepper(val); }}
					items={stepperItemsDownloadFileFormat}
					arrowed
				/>
				{stepper === 'tradeParty' && (
					<TradeParty
						value={value}
						onChange={onChange}
						control={control}
						tradePartyName={tradePartyName}
						valueTradeParty={valueTradeParty}
						setValueTradeParty={setValueTradeParty}
					/>
				)}

				<Modal.Footer>
					{stepper === 'tradeParty' && <Button onClick={() => { setStepper('bankName'); }}>Next</Button>}

					{stepper === 'bankName' && (
						<div className={styles.button_container}>
							<Button themeType="secondary" onClick={() => { setStepper('tradeParty'); }}>Back</Button>
							<Button>Download</Button>
						</div>
					) }
				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default DownloadFileFormat;
