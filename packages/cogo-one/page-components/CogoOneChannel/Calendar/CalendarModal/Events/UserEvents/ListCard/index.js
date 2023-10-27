import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import { ICON_MAPPING } from '../../../../../../../constants/calenderConstants';

import styles from './styles.module.css';

const LAST_INDEX = 1;

function ListCard({
	finalList = [], activeTab = '', actions = () => {},
}) {
	const { userId = '' } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));

	return (
		<div>
			{(finalList || []).map((singleEvent) => {
				const {
					subject = '',
					description = '',
					metadata = {},
					is_important = false,
					validity_start = '',
					category = '',
					validity_end = '',
					participants = [],
					performed_by_id = '',
					main_status,
					status = '',
					invite_link = '',
					schedule_end = '',
					schedule_start = '',
				} = singleEvent || {};
				const meetLink = invite_link;
				const isOwner = userId === performed_by_id;
				const checkStatus = activeTab === 'schedules' ? main_status : status;
				const { organization_data = {}, user_data = {} } = metadata || {};
				const ACTIONS = actions({ category });
				const USER_CONTACT_DETAILS = [user_data?.name, user_data?.email];

				const startTime = formatDate({
					date       : new Date(activeTab === 'schedules' ? schedule_start : validity_start),
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'time',
				});

				const endTime = formatDate({
					date       : new Date(activeTab === 'schedules' ? schedule_end : validity_end),
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'time',
				});

				const startDate = formatDate({
					date       : new Date(validity_start) || new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ' ',
				});

				const endDate = formatDate({
					date       : new Date(validity_end) || new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['MMMM dd, YYYY'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ' ',
				});

				const TIME_MAPPING = {
					schedules : `Start at ${startTime} and end at ${endTime}`,
					calendars : `Validity Start at ${startDate} and  Validity End at ${endDate}`,
				};

				const icons = ICON_MAPPING[subject] || ICON_MAPPING?.default;
				const isImportant = is_important && main_status !== 'completed';

				return (
					<div
						className={cl`${styles.card}
              ${isImportant ? styles.important_event : styles.not_important_event}
              ${main_status === 'completed' ? styles.expired_event : ''}
              `}
						key={singleEvent?.id}
					>
						{category === 'meeting' ? (
							<div className={styles.meeting}>
								<Image
									src={GLOBAL_CONSTANTS.image_url.meetings}
									width={20}
									height={20}
									alt="logo"
								/>
							</div>
						) : null}

						<div className={styles.avatar_container}>
							<div
								className={styles.avatar}
								style={{
									background: main_status !== 'completed'
										? `${icons?.color}` : 'rgb(221 221 221 / 20.1%)',
								}}
							>
								{icons?.icon}
							</div>
							{category === 'reminder' ? (
								<div className={styles.time}>{startTime}</div>
							) : null}
						</div>
						<div className={styles.details}>
							<div className={styles.business_name}>
								{startCase(organization_data?.business_name) || subject}
							</div>
							<div className={styles.description}>{description}</div>
							{category === 'reminder' ? (
								<>
									<div className={styles.schedules_details}>
										<div className={styles.name}>
											Schedule at:
											{' '}
											{startDate}
										</div>
									</div>
									<div className={styles.poc_details}>
										<div className={styles.name}>POC:</div>
										<div className={styles.poc_data}>
											{(USER_CONTACT_DETAILS || []).map((item) => (
												<div className={styles.contact_details} key={item}>
													{item}
												</div>
											))}
										</div>
									</div>
								</>
							) : null}

							{category === 'meeting' ? (
								<>
									<div className={styles.title}>Participants :</div>
									<div className={styles.partispants}>
										{(participants || []).map((item, index) => (
											<div key={item?.id} className={styles.partispants_users}>
												{item?.user_data?.name}
												{index < participants.length - LAST_INDEX && ', '}
												{' '}
											</div>
										))}
									</div>
									<div
										className={styles.invite_link}
										onClick={() => window.open(meetLink, '_blank')}
										role="presentation"
									>
										{invite_link}
									</div>
									<div className={styles.meeting_times}>
										{TIME_MAPPING[activeTab]}
									</div>
								</>
							) : null}

							{isOwner && checkStatus === 'active' ? (
								<div className={styles.actions}>
									{((ACTIONS) || []).map((value) => {
										if (!value?.show) {
											return null;
										}
										return (
											<div
												role="presentation"
												className={styles.single_action}
												key={value?.key}
												onClick={() => value?.action({
													singleEvent,
													key: value?.key,
												})}
											>
												{value.icon}
											</div>
										);
									})}
								</div>
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ListCard;
