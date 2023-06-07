import { Button, Modal, Stepper } from '@cogoport/components';
import { useState } from 'react';

import { STEPPER_ITEMS_DOWNLOAD_FILE_FORMAT } from '../../../../Constants';
import useDownloadFileFormat from '../../../../hooks/useDownloadFileFormat';
import { UploadFileInterface } from '../../interface';

import BankName from './BankName';
import styles from './styles.module.css';
import TradeParty from './TradeParty';

function DownloadFileFormat({ showModal, setShowModal, control }:UploadFileInterface) {
	const [stepper, setStepper] = useState('tradeParty');
	const [value, onChange] = useState('AP');
	const [valueTradeParty, setValueTradeParty] = useState([]);

	const formattedData = (valueTradeParty || []).map((item) => {
		const {
			cogo_entity_id:cogoEntityId,
			id,
			serial_id:tradePartySerialId,
			legal_business_name:tradePartyName,
			newVal,
			currency,
		} = item || {};

		const { account_number:accountNumber, account_name:cogoBank } = newVal || {};

		return {
			cogoEntityId,
			tradePartyDetailId : id,
			tradePartySerialId,
			tradePartyName,
			currency,
			cogoAccountNo      : accountNumber,
			accountNumber,
			cogoBank,
		};
	});

	const { handleDownload, loading } = useDownloadFileFormat({
		formattedData,
		value,
		setShowModal,
	});

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
				<Modal.Body>

					<Stepper
						active={stepper}
						setActive={(val:string) => { setStepper(val); }}
						items={STEPPER_ITEMS_DOWNLOAD_FILE_FORMAT}
						arrowed
					/>
					{stepper === 'tradeParty' && (
						<TradeParty
							value={value}
							onChange={onChange}
							control={control}
							valueTradeParty={valueTradeParty}
							setValueTradeParty={setValueTradeParty}
						/>
					)}
					{stepper === 'bankName' && (
						<>
							<div className={styles.count_data}>
								You have Selected
								{' '}
								{valueTradeParty.length}
								{' '}
								Organizations in
								{' '}
								{value}
								{' '}
								mode
							</div>
							{(valueTradeParty || []).map((item) => (
								<BankName
									valueTradeParty={valueTradeParty}
									setValueTradeParty={setValueTradeParty}
									key={item?.id}
									item={item}
								/>
							)) }

						</>

					)}
				</Modal.Body>

				<Modal.Footer>
					{stepper === 'tradeParty' && (
						<Button
							disabled={valueTradeParty?.length <= 0}
							onClick={() => { setStepper('bankName'); }}
						>
							Next
						</Button>
					)}

					{stepper === 'bankName' && (
						<div className={styles.button_container}>
							<Button
								type="button"
								themeType="secondary"
								onClick={() => { setStepper('tradeParty'); }}
							>
								Back

							</Button>
							<Button
								type="button"
								loading={loading}
								onClick={() => {
									handleDownload();
								}}
							>
								Download

							</Button>
						</div>
					) }
				</Modal.Footer>

			</Modal>

		</div>
	);
}
export default DownloadFileFormat;
