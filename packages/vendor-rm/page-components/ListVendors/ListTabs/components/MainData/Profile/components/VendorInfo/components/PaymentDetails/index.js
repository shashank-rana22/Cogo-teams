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
}) {
	// Todo: need to fetch this from backend instead of showing it as a state, from the list itself....
	const [activate, setActivate] = useState('active');

	const [showModal, setShowModal] = useState(false);

	const { accountLoading = false, handleActivation = () => {} } = useActivateAccount({ setShowModal });

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

	// Todo : as this is a list, also send the id
	return (
		<>
			{(data.bank_details || []).map((bankDetail, index) => (
				<div
					className={cl`${styles.main_container} ${
						index !== 0 ? styles.padding : null
					}`}
					key={bankDetail.id}
					style={{ borderTop: index > GLOBAL_CONSTANTS.zeroth_index ? '1px dashed #707070' : '' }}
				>

					<div className={styles.status_container}>
						<Pill color={activate === 'active' ? '#c4dc91' : '#abb0de'}>
							Status :
							{' '}
							<strong>{startCase(activate)}</strong>
						</Pill>

						<Button
							loading={accountLoading}
							disabled={accountLoading}
							size="sm"
							onClick={() => setShowModal(true)}
						>
							{startCase(activate)}
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
			))}

			{showModal ? (
				<Modal
					show={showModal}
					size="lg"
					onClose={() => setShowModal(false)}
				>
					<Modal.Header title="Confirmation" />

					<Modal.Body>
						Are you sure, you want to activate this account?
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							type="button"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => {
								setShowModal(false);
							}}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							size="md"
							// Todo: also send the id of the list item of the button
							onClick={() => handleActivation({ setShowModal, setActivate })}
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
