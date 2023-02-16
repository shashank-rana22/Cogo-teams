/* eslint-disable react/jsx-no-useless-fragment */
import { cl } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { startCase, format, differenceInDays, isEmpty } from '@cogoport/utils';

import { VOICE_ICON_MAPPING } from '../../../constants';
import useGetVoiceCallList from '../../../hooks/useGetVoiceCallList';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function VoiceList({
	setActiveVoiceCard = () => {},
	activeVoiceCard,
	activeTab,
}) {
	const {
		loading,
		data = {},
		handleScroll = () => {},
	} = useGetVoiceCallList({ activeTab });

	const { list = [] } = data;

	const callStatus = (item) => {
		let status = '';
		const { call_status = '', call_type = '' } = item || {};
		if (call_status === 'answered' && call_type === 'outgoing') {
			status = 'outgoing';
		} else if (call_status === 'answered' && call_type === 'incoming') {
			status = 'incoming';
		} else if (isEmpty(call_status)) {
			status = call_type;
		} else {
			status = call_status;
		}
		return status;
	};

	if (isEmpty(list)) {
		return (
			<div className={styles.list_container}>
				<div className={styles.empty_container}>
					<div className={styles.empty_state}>
						<div className={styles.call_icon}>
							<IcMCall width={20} height={20} fill="#BDBDBD" />
						</div>
						Empty Call Log..
					</div>
				</div>
			</div>
		);
	}

	return (

		<>
			<div
				className={styles.list_container}
				onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
			>

				{(list || []).map((item) => {
					const { user_data = {}, user_number = '' } = item || {};
					const checkActiveCard = activeVoiceCard?.id === item?.id;
					const daysDifference = differenceInDays(new Date(), new Date(item.start_time_of_call));
					const checkUserData = Object.keys(item || {}).includes('user_data');

					return (
						<div
							role="presentation"
							className={cl`
				${styles.card_Container}
				${checkActiveCard ? styles.active_card : ''}
				 `}
							onClick={() => setActiveVoiceCard(item)}
						>
							<div className={styles.card}>

								<div className={styles.user_information}>
									<div className={styles.avatar_Container}>
										<img
											src={VOICE_ICON_MAPPING[callStatus(item)]}
											className={styles.avatar}
											alt=""
										/>
										<div className={styles.user_details}>
											<div className={styles.user_name}>
												{checkUserData && !isEmpty(user_data) ? (
													<>
														{startCase(user_data?.name)}
													</>
												) : (
													<>
														{user_number}
													</>
												)}

											</div>
											<div className={styles.organisation}>
												Organisation
												{' '}
												{item.organisation}
											</div>
										</div>
									</div>

									<div className={styles.user_activity}>
										<div className={styles.activity_duration}>
											{daysDifference > 7 ? (
												<>
													{format(item.start_time_of_call, 'dd/mm/yy')}
												</>
											) : (
												<>
													{format(item.start_time_of_call, 'EEE')}
												</>
											)}

										</div>
										<div className={styles.activity_duration}>
											{format(item.start_time_of_call, 'HH:mm a')}
										</div>
									</div>

								</div>
							</div>
						</div>
					);
				})}
				{loading && <LoadingState /> }
			</div>

			{/* {!isEmpty(list) && (
				<div className={styles.list_container}>
					<div className={styles.empty_container}>
						<div className={styles.empty_state}>
							<div className={styles.call_icon}>
								<IcMCall width={20} height={20} fill="#BDBDBD" />
							</div>
							Empty Call Log..
						</div>
					</div>
				</div>
			)} */}
		</>
	);
}

export default VoiceList;
