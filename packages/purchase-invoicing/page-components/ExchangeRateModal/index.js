import { Button, Modal, Checkbox } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAttach, IcMInfo } from '@cogoport/icons-react';
import { useRequestBf } from '@cogoport/request';
import React from 'react';

import styles from './styles.module.css';

function ExchangeRateModal({
	exchangeRateModal, setExchangeRateModal, handleFinalSubmit, collectionPartyId, exchangeProofUrl,
	setExchangeProofUrl,
	checkedDeviation,
	setCheckedDeviation,
}) {
	const [{ data, loading }] = useRequestBf(
		{
			url     : `/purchase/bills/exchange-rate-deviation/${collectionPartyId}`,
			method  : 'get',
			authKey : 'get_purchase_bills_exchange_rate_deviation_by_id',
		},
		{ manual: false },
	);

	const handleChange = (info) => {
		setExchangeProofUrl(info);
	};

	return (
		<div>
			<Modal
				size="lg"
				show={exchangeRateModal}
				onClose={() => {
					setExchangeRateModal(false);
				}}
				placement="center"
				className={styles.modal_container}
			>
				<Modal.Header title={(
					<div className={`${styles.flex} ${styles.align}`}>
						WARNING MESSAGE !
					</div>
				)}
				/>
				<Modal.Body>
					<div className={styles.exchangeheading}>
						<div>Dear User, Exchange rate entered by you exceeds the XE exchange rate for </div>
						<strong>
							{formatDate({
								date       : data?.invoice_date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</strong>
					</div>
					<div className={styles.flex}>
						<div className={`${styles.exchangevalue} ${styles.bold}`}>
							Exchange Currency
						</div>
						<div className={`${styles.exchangevalue} ${styles.bold}`}>
							Decl. Exchange Rate
						</div>
						<div className={`${styles.exchangevalue} ${styles.bold}`}>
							XE Exchange Rate
						</div>
						<div className={`${styles.exchangevalue} ${styles.bold}`}>
							Exchange Deviation (%)
						</div>
					</div>
					<div className={styles.flex}>
						{[{
							exchange_deviation : -2.23,
							from_currency      : 'USD',
							rate               : 83.59,
							to_currency        : 'INR',
							xe_rate            : 81.76715,
						}]?.map((item) => (
							<div className={styles.flex}>
								<div className={`${styles.exchangevalue}`}>
									{item?.from_currency}
									{' '}
									<span style={{ padding: '0px 14px' }}>
										-
										{'>'}
									</span>
									{' '}
									{item?.to_currency}
								</div>
								<div />

								<div className={`${styles.exchangevalue}`}>{item?.rate}</div>
								<div />

								<div className={`${styles.exchangevalue}`}>{item?.xe_rate?.toFixed(2)}</div>
								<div />

								<div className={`${styles.exchangevalue} ${styles.warning}`}>
									{item?.exchange_deviation}
									%
								</div>
							</div>
						))}
					</div>
					<div className={styles.uploaddiv}>Upload Proof :</div>
					<div className={styles.uploader}>
						<FileUploader
							uploadDesc="Upload files"
							uploadIcon={(
								<IcMAttach
									height={40}
									width={40}
								/>
							)}
							accept=".xlsx"
							onChange={handleChange}
							value={exchangeProofUrl}
						/>
					</div>
					<div className={styles.info}>
						<span className={styles.information}><IcMInfo height={20} width={20} /></span>
						Please upload an exchange rate proof procured from Forwarders,
						NVOCCs, Co-Loaders, Overseas Agents, IATA Agents / For shipping
						Lines & Airlines Uploaded invoice acts as a proof.
					</div>
					<div className={`${styles.flex} ${styles.justifiy}`}>
						<Checkbox checked={checkedDeviation} onChange={() => setCheckedDeviation(!checkedDeviation)} />
						<div>If the Provided Exchange Rate is valid, Kindly proceed further.</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.buttoncontainer}>
						<Button className={`${styles.cancel}`} themeType="secondary">Cancel</Button>
						<Button
							className={styles.button}
							onClick={() => {
								handleFinalSubmit();
							}}
						>
							Proceed
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ExchangeRateModal;
