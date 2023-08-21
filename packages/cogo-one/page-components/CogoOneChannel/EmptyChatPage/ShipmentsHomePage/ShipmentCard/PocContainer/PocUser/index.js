import { Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMEmail, IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const MAX_PREVIEW_LIMIT = 2;
const MIN_PREVIEW_LIMIT = 0;
const LAST_INDEX = 1;

const getEachUserFormatedData = ({ userDetails = {} }) => {
	const {
		stakeholder_type = '', user = {}, id = '', name: pocName = '',
		mobile_country_code: pocMobileCountryCode = '', processes = [], mobile_number = '', email = '',
	} = userDetails;

	const {
		name = '',
		id: userId = '',
		mobile_country_code = '',
		mobile_number: mobileNumber = '',
		email: userEmail = '',
	} = user || {};
	return {
		id,
		name                : name || pocName,
		stakeholder_type    : Object.keys(userDetails).includes('processes') ? processes : [stakeholder_type],
		mobileNumber        : mobileNumber || mobile_number,
		mobile_country_code : mobile_country_code || pocMobileCountryCode,
		userId              : userId || id,
		email               : userEmail || email,
	};
};

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
					const {
						id = '', name = '',
						stakeholder_type = [],
						mobileNumber = '',
						mobile_country_code = '',
						userId = '',
						email = '',
					} = getEachUserFormatedData({ userDetails });

					const lessList = (stakeholder_type || []).slice(MIN_PREVIEW_LIMIT, MAX_PREVIEW_LIMIT);
					const moreList = (stakeholder_type || []).slice(MAX_PREVIEW_LIMIT);
					const showMoreList = (stakeholder_type || []).length > MAX_PREVIEW_LIMIT;

					const user = { id, email };
					const countryCode = mobile_country_code.replace('+', '');

					return (
						<div className={styles.container} key={id}>
							<div className={styles.user_details}>
								<div className={styles.user_name}>
									{startCase(name)}
								</div>

								<div className={styles.user_work_scope}>
									{(lessList || []).map((item, index) => (
										<div className={styles.scope_name} key={item}>
											{startCase(item)}
											{index !== lessList.length - LAST_INDEX ? ',' : ''}
										</div>
									))}
									{showMoreList && (
										<Tooltip
											content={(
												<div>
													{(moreList || []).map((item) => (
														<div
															className={styles.scope_name}
															key={item}
														>
															{startCase(item)}

														</div>
													))}
												</div>
											)}
											theme="light"
											placement="bottom"
										>
											<div className={styles.more_tags}>
												{moreList?.length}
												+
											</div>
										</Tooltip>
									)}
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
