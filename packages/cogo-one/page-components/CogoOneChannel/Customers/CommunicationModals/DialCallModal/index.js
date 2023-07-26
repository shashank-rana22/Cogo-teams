import { Modal } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import mobileNumberPads from '../../../../../configurations/number-pad';

import styles from './styles.module.css';

const ELEMENTS_TO_BE_DELETED = 1;

function DialCallModal({ showDialModal = false, setShowDialModal = () => {} }) {
	const dispatch = useDispatch();
	const geo = getGeoConstants();

	const [dialNumber, setDialNumber] = useState({
		number       : '',
		country_code : geo.country.mobile_country_code,
	});

	const handleChange = (val) => {
		setDialNumber({ ...dialNumber, number: `${dialNumber.number}${val}` });
	};

	const handleDelete = () => {
		setDialNumber({
			...dialNumber,
			number: (dialNumber?.number || '')?.slice(GLOBAL_CONSTANTS.zeroth_index, -ELEMENTS_TO_BE_DELETED),
		});
	};

	const handleClick = () => {
		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime           : new Date(),
					mobile_number       : dialNumber?.number,
					mobile_country_code : dialNumber?.country_code,
					isUnkownUser        : true,
				},
			}),
		);
		setShowDialModal(false);
	};
	return (
		<Modal
			size="sm"
			show={showDialModal}
			onClose={() => setShowDialModal(false)}
			onOuterClick={() => setShowDialModal(false)}
			className={styles.styled_ui_modal_dialog}
			scroll={false}
		>
			<Modal.Header title="New Call" />
			<Modal.Body>
				<SelectMobileNumber
					value={dialNumber}
					onChange={(val) => setDialNumber(val)}
					inputType="number"
					placeholder="Enter number"
				/>
				<div className={styles.number_div}>
					{mobileNumberPads.map(({ label, lowerlabel, icon }) => (
						<>
							{label !== '' && (
								<div
									role="presentation"
									className={styles.number_pad}
									onClick={() => handleChange(label)}
								>
									<div className={styles.number}>{label}</div>
									<div className={styles.letter}>{lowerlabel}</div>
								</div>
							)}
							<div className={styles.delete_div}>
								{icon && (
									<div
										role="presentation"
										className={styles.delete_icon}
										onClick={handleDelete}
									>
										{icon}
									</div>
								)}
							</div>
						</>
					))}
				</div>
				<div
					role="presentation"
					className={styles.call_div}
					onClick={handleClick}
				>
					<IcMCall />
				</div>
			</Modal.Body>
		</Modal>
	);
}
export default DialCallModal;
