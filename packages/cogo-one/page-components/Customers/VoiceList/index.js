import { cl } from '@cogoport/components';
import { startCase, format, differenceInDays, isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { VOICE_ICON_MAPPING } from '../../../constants';
import LoadingState from '../LoadingState';

import styles from './styles.module.css';

function VoiceList({
	voiceList,
	setActiveVoiceCard = () => {},
	activeVoiceCard,
	voiceListLoading,
}) {
	const callStatus = (item) => {
		let status = '';
		const { call_status = '', call_type = '' } = item || {};
		if (call_status === 'answered' && call_type === 'outgoing') {
			status = 'outgoing';
		} else if (call_status === 'answered' && call_type === 'incoming') {
			status = 'incoming';
		} else {
			status = call_status;
		}
		return status;
	};

	useEffect(() => {
		if (!isEmpty(voiceList)) {
			setActiveVoiceCard(voiceList?.[0]);
		}
	}, []);

	if (voiceListLoading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.list_container}>

			{(voiceList || []).map((item) => {
				const { user_data = {} } = item || {};
				const checkActiveCard = activeVoiceCard?.id === item?.id;
				const daysDifference = differenceInDays(new Date(), new Date(item.start_time_of_call));

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
											{startCase(user_data?.name)}
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
		</div>

	);
}

export default VoiceList;
