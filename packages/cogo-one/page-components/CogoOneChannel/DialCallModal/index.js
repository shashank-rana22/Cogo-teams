import { Modal } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import mobileNumberPads from '../../../configurations/number-pad';

import styles from './styles.module.css';

function DialCallModal({ showDialModal, setShowDialModal = () => {} }) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));
	const [dialNumber, setDialNumber] = useState({
		number       : '',
		country_code : '+91',
	});

	const handleChange = (val) => {
		setDialNumber({ ...dialNumber, number: `${dialNumber.number}${val}` });
	};

	const handleDelete = () => {
		setDialNumber({
			...dialNumber,
			number: (dialNumber?.number || '')?.substring(
				0,
				Number(dialNumber?.number?.length) - 1,
			),
		});
	};

	const handleClick = () => {
		dispatch(
			setProfileState({
				...profileData,
				voice_call: {
					...profileData.voice_call,
					dialCall            : true,
					showCallModal       : true,
					inCall              : true,
					startTime           : new Date(),
					endCall             : false,
					showFeedbackModal   : false,
					agentId             : profileData?.user?.id,
					mobile_number       : dialNumber?.number,
					mobile_country_code : dialNumber?.country_code,
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
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/callButton-icon.svg"
						alt="call button"
						className={styles.call_icon}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
}
export default DialCallModal;
