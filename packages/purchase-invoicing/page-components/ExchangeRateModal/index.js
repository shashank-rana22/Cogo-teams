import { Button, Modal, Checkbox, Placeholder } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMAttach, IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { BILL_MAPPINGS } from '../../constants';
import useGetExchangeRate from '../../hooks/useGetExchangeRate';
import toastApiError from '../../utils/toastApiError';

import styles from './styles.module.css';

function ExchangeRateModal({
	exchangeRateModal = false,
	setExchangeRateModal = () => {},
	handleFinalSubmit = () => {},
	billId,
	loading,
	purchaseInvoiceValues,
}) {
	const [exchangeProofUrl, setExchangeProofUrl] = useState('');
	const [checkedDeviation, setCheckedDeviation] = useState(false);

	const { data, exchangeRateloading } = useGetExchangeRate({ billId });

	const handleChange = (info) => {
		setExchangeProofUrl(info);
	};

	const handleSubmit = async () => {
		const values = {
			exchange_rate_document : exchangeProofUrl,
			is_deviation_accepted  : checkedDeviation,
			billType               : BILL_MAPPINGS[purchaseInvoiceValues?.invoice_type],
		};
		if (isEmpty(exchangeProofUrl) && !checkedDeviation) {
			toastApiError('Please Upload Exchange Rate Proof');
		} else {
			await handleFinalSubmit(values);
		}
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
				{exchangeRateloading ? <Placeholder /> : (
					<>
						{' '}
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
								<div className={`${styles.exchangevalue} ${styles.span} ${styles.bold}`}>
									Exchange Currency
								</div>
								<div className={`${styles.exchangevalue} ${styles.bold} ${styles.rate}`}>
									Decl. Exchange Rate
								</div>
								<div className={`${styles.exchangevalue} ${styles.span} ${styles.bold}`}>
									XE Exchange Rate
								</div>
								<div className={`${styles.exchangevalue} ${styles.bold} ${styles.rate}`}>
									Exchange Deviation (%)
								</div>
							</div>
							<div className={styles.flex}>
								{data?.exchange_rates?.map((item) => (
									<div className={styles.flex} key={item?.xe_rate}>
										<div className={`${styles.exchangevalue} ${styles.span}`}>
											{item?.from_currency}
											{' '}
											<span className={styles.paddi}>
												-
												{'>'}
											</span>
											{' '}
											{item?.to_currency}
										</div>

										<div className={`${styles.exchangevalue}`}>{item?.rate}</div>

										<div className={`${styles.exchangevalue}`}>{item?.xe_rate?.toFixed(2)}</div>

										<div className={`${styles.exchangevalue}
										${styles.warning}`}
										>
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
								<Checkbox
									checked={checkedDeviation}
									onChange={() => setCheckedDeviation(!checkedDeviation)}
								/>
								<div>If the Provided Exchange Rate is valid, Kindly proceed further.</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<div className={styles.buttoncontainer}>
								<Button
									className={styles.cancel}
									onClick={() => {
										setExchangeRateModal(false);
									}}
									themeType="secondary"
								>
									Cancel
								</Button>
								<Button
									className={styles.button}
									loading={loading}
									onClick={
									handleSubmit
									}
								>
									{loading ? 'Uploading' : 'Proceed'}
								</Button>
							</div>
						</Modal.Footer>
					</>
				)}
			</Modal>
		</div>
	);
}

export default ExchangeRateModal;
