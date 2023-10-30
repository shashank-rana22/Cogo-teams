import { Tooltip, Avatar, cl, Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMEmail, IcMCall, IcMWhatsapp, IcMLiveChat } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase, isEmpty } from '@cogoport/utils';

import getEachUserFormatedData from '../../../utils/getPocUserFormattedData';
import hideDetails from '../../../utils/hideDetails';

import styles from './styles.module.css';

const MAX_PREVIEW_LIMIT = 1;
const MIN_PREVIEW_LIMIT = 0;
const LAST_INDEX = 1;

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
	showPocDetails = {},
	mailProps = {},
	setActiveTab = () => {},
	handleShipmentChat = () => {},
}) {
	const dispatch = useDispatch();

	const geo = getGeoConstants();

	const hasVoiceCallAccess = geo.others.navigations.cogo_one.has_voice_call_access;

	const { setButtonType, setEmailState, buttonType, signature } = mailProps;

	const handleSendEmail = ({ user = {} }) => {
		if (buttonType) {
			Toast.warn('Email compose is already in progress');
			return;
		}

		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : signature,
				rteContent    : '',
				subject       : '',
				toUserEmail   : user?.email ? [user?.email] : [],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
	};

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
						trade_type,
						chatOption = false,
						isPrimaryPoc = false,
						isCustomer = false,
						isTradePartner = false,
					} = getEachUserFormatedData({ userDetails });

					const chatData = {
						user_id                 : userId,
						user_name               : name,
						whatsapp_number_eformat : mobileNumber,
						email,
						channel_type            : 'whatsapp',
						countryCode             : mobile_country_code,
						mobile_no               : `${mobile_country_code?.replace('+', '')}${mobileNumber}`,
					};

					const lessList = (stakeholder_type || []).slice(MIN_PREVIEW_LIMIT, MAX_PREVIEW_LIMIT);
					const moreList = (stakeholder_type || []).slice(MAX_PREVIEW_LIMIT);
					const showMoreList = (stakeholder_type || []).length > MAX_PREVIEW_LIMIT;

					const user = { id, email };
					const countryCode = mobile_country_code?.replace('+', '');

					return (
						<div className={styles.main_container} key={id}>
							<div className={styles.container}>
								<div className={styles.user_info}>
									<Avatar
										personName={name || 'user'}
										size="32px"
										className={cl`${styles.styled_avatar}
										${isCustomer ? styles.customer_avatar : ''}
										${isTradePartner ? styles.trade_partners_avatar : ''}
										`}
									/>
									<div className={styles.user_details}>
										<div className={styles.user_name}>
											{startCase(name || 'User')}
										</div>
										<div className={styles.user_work_scope}>
											{isCustomer ? (
												<div className={styles.scope_name}>
													{isPrimaryPoc ? 'Customer - Primary POC' : 'Customer'}
												</div>
											) : null}

											{isTradePartner ? (
												<div className={styles.trade_type}>
													{startCase(trade_type)}
												</div>
											) : null }

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
														+
														{moreList?.length}
													</div>
												</Tooltip>
											)}
										</div>
									</div>
								</div>
								<div className={styles.action_icons}>
									{chatOption ? (
										<IcMWhatsapp
											className={cl`${styles.whatsapp_icon}
										${isCustomer ? styles.customer_icons : ''}
										${isTradePartner ? styles.trade_partners_icons : ''}`}
											onClick={() => setActiveTab((prev) => ({
												...prev,
												hasNoFireBaseRoom : true,
												data              : chatData,
												tab               : 'message',
											}))}
										/>
									) : null}

									{(!isCustomer && !isTradePartner) ? (
										<IcMLiveChat
											className={styles.message_icon_styles}
											onClick={() => handleShipmentChat({ shipmentDetails: showPocDetails })}
										/>

									) : null}

									{hasVoiceCallAccess ? (
										<Tooltip
											content={hideDetails({ data: mobileNumber, countryCode, type: 'number' })}
											theme="light"
											placement="bottom"
										>
											<IcMCall
												className={cl`${styles.call_icon_styles}
											${isCustomer ? styles.customer_icons : ''}
											${isTradePartner ? styles.trade_partners_icons : ''}`}
												onClick={() => handleVoiceCall({
													mobileNumber,
													userId,
													name,
													countryCode,
													dispatch,
												})}
											/>
										</Tooltip>
									) : null}

									<IcMEmail
										className={cl`${styles.email_icon_styles}
										${isCustomer ? styles.customer_icons : ''}
										${isTradePartner ? styles.trade_partners_icons : ''}`}
										onClick={() => handleSendEmail({ user })}
									/>
								</div>
							</div>
						</div>
					);
				},
			)}
		</div>
	);
}

export default PocUser;
