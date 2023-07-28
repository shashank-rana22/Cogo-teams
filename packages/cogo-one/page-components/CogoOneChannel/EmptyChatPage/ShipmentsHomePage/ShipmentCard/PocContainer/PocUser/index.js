import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const handleVoiceCall = ({ mobileNumber, userId, name, countryCode, dispatch }) => {
	if (!mobileNumber) {
		return;
	}

	dispatch(
		setProfileState({
			is_in_voice_call          : true,
			voice_call_recipient_data : {
				startTime           : new Date(),
				orgId               : '',
				userId,
				mobile_number       : mobileNumber,
				mobile_country_code : `+${countryCode}`,
				userName            : name,
				isUnkownUser        : !userId,
			},
		}),
	);
};

function PocUser({
	stakeHoldersData = [],
	setModalData = () => {},
}) {
	const dispatch = useDispatch();
	const geo = getGeoConstants();

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;

	if (isEmpty(stakeHoldersData)) {
		return "No POC's found";
	}

	return (
		<div className={styles.pocusers_container}>
			{stakeHoldersData.map(
				(userDetails) => {
					const { stakeholder_type = '', user = {}, id = '' } = userDetails;
					const {
						name = '',
						id: userId = '',
						mobile_country_code = '',
						mobile_number: mobileNumber = '',
					} = user || {};

					const countryCode = mobile_country_code.replace('+', '');

					return (
						<div className={styles.container} key={id}>
							<div className={styles.user_details}>
								<div className={styles.user_name}>
									{startCase(name)}
								</div>

								<div className={cl`${styles.user_name} ${styles.user_role}`}>
									{startCase(stakeholder_type)}
								</div>
							</div>

							<div>
								{hasVoiceCallAccess && (
									<IcMCall
										className={styles.call_icon_styles}
										onClick={() => handleVoiceCall({
											mobileNumber,
											userId,
											name,
											countryCode,
											dispatch,
										})}
									/>
								)}

								<IcMEmail
									className={styles.email_icon_styles}
									onClick={() => setModalData({
										modalType : 'email',
										userData  : user,
									})}
								/>
							</div>
						</div>
					);
				},
			)}
		</div>
	);
}

export default PocUser;
