import { Button, Modal, Pill, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import fieldsInPaymentDetails from '../../../../../../../../../utils/fieldsInPaymentDetails';
import getShortFileName from '../../../../../../../../../utils/getShortFileName';
import useActivateAccount from '../../../../hooks/useActivateAccount';

import styles from './styles.module.css';

const DO_NOT_STARTCASE = ['bank_document_url', 'tax_document_url', 'address'];

function PaymentDetails({
	data = {},
	refetchVendorInfo = () => {},
}) {
	const [showModal, setShowModal] = useState('');
	const [accountStatus, setAccountStatus] = useState('inactive');

	const {
		accountLoading = false,
		handleActivation = () => {},
	} = useActivateAccount({ setShowModal, refetchVendorInfo });

	const FIELDS_TO_SHOW = fieldsInPaymentDetails();
	function GetDisplayValue({ bankDetail, key }) {
		const val = bankDetail[key];

		if (!val) {
			return '-';
		}

		if (['bank_document_url', 'tax_document_url'].includes(key)) {
			const shortName = getShortFileName({ url: val });

			return (
				<a
					className={styles.icon_container}
					href={val}
					target="_blank"
					rel="noreferrer"
				>
					{shortName}
					<Image src={GLOBAL_CONSTANTS.image_url.download_icon_svg} width={30} height={30} />
				</a>
			);
		}

		if (DO_NOT_STARTCASE.includes(key)) {
			return val;
		}

		return startCase(val);
	}

	return (
		<>
			{(data.bank_details || []).map((bankDetail, index) => {
				const { status = '', id = '' } = bankDetail || {};

				return (
					<div
						className={cl`${styles.main_container} ${
							index !== 0 ? styles.padding : null
						}`}
						key={id}
						style={{ borderTop: index > GLOBAL_CONSTANTS.zeroth_index ? '1px dashed #707070' : '' }}
					>

						<div className={styles.status_container}>
							<Pill color={status === 'active' ? '#c4dc91' : '#ced1ed'}>
								Status:
								{' '}
								<strong>{startCase(status)}</strong>
							</Pill>

							<Button
								loading={accountLoading}
								disabled={accountLoading}
								size="sm"
								onClick={() => { setShowModal(id); setAccountStatus(status); }}
							>
								{status === 'active' ? 'De-Activate' : 'Activate'}
							</Button>
						</div>

						<div className={styles.bank_details_container}>
							{Object.keys(FIELDS_TO_SHOW).map((bankDetailsKey) => {
								const label = FIELDS_TO_SHOW[bankDetailsKey];

								if (!bankDetail?.[bankDetailsKey]) return null;

								return (
									<div
										key={bankDetailsKey}
										className={styles.box_info}
									>
										<div className={styles.label}>
											{label}
										</div>

										<div className={styles.value}>
											{GetDisplayValue({ bankDetail, key: bankDetailsKey })}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}

			{showModal ? (
				<Modal
					show={showModal}
					size="lg"
					onClose={() => setShowModal('')}
				>
					<Modal.Header title="Confirmation" />

					<Modal.Body>
						Are you sure, you want to
						{' '}
						{accountStatus === 'active' ? 'de-activate' : 'activate'}
						{' '}
						this account?
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							type="button"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => {
								setShowModal('');
							}}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							size="md"
							onClick={() => handleActivation({ showModal, accountStatus })}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</>
	);
}

export default PaymentDetails;
