import { cl, Tooltip } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useCreateUserContactRequest from '../../../../../hooks/useCreateUserContactRequest';
import getMaskedNumber from '../../../../../utils/getMaskedNumber';

import ReasonModal from './ReasonModal';
import styles from './styles.module.css';

const MAX_PREVIEW_LIMIT = 2;
const MIN_PREVIEW_LIMIT = 0;
const REMOVE_PLUS_SIGN = 1;

function OrganizationUsers({ user = {}, hasVoiceCallAccess = false, setActiveTab = () => {}, isMobile = false }) {
	const dispatch = useDispatch();

	const [maskConfig, setMaskConfig] = useState({
		showNumber      : false,
		showReasonModal : false,
	});

	const { loading = false, createUserContactRequest = () => {} } = useCreateUserContactRequest({ setMaskConfig });

	const { showNumber, showReasonModal } = maskConfig || {};

	const {
		user_id = '', email = '', mobile_country_code = '', mobile_number = '', name = '',
		organization_id = '', work_scopes = [], whatsapp_number_eformat = '',
		whatsapp_country_code = '',
		whatsapp_number = '',
	} = user || {};

	const lessList = (work_scopes || []).slice(MIN_PREVIEW_LIMIT, MAX_PREVIEW_LIMIT);
	const moreList = (work_scopes || []).slice(MAX_PREVIEW_LIMIT);
	const showMoreList = (work_scopes || []).length > MAX_PREVIEW_LIMIT;

	const onClose = ({ reset }) => {
		setMaskConfig((prev) => ({ ...prev, showReasonModal: false }));
		reset();
	};

	const handleViewNumber = (e) => {
		e.stopPropagation();
		if (showNumber) {
			setMaskConfig((prev) => ({ ...prev, showNumber: false }));
		} else {
			setMaskConfig((prev) => ({ ...prev, showReasonModal: true }));
		}
	};

	const handleCall = (e) => {
		e.stopPropagation();
		if (!mobile_number || !hasVoiceCallAccess) {
			return;
		}

		dispatch(
			setProfileState({
				is_in_voice_call          : true,
				voice_call_recipient_data : {
					startTime    : new Date(),
					orgId        : organization_id,
					userId       : user_id,
					mobile_number,
					mobile_country_code,
					userName     : name,
					isUnkownUser : !user_id,
				},
			}),
		);
	};

	const whatsappMobileNumber = `${whatsapp_country_code?.slice(REMOVE_PLUS_SIGN) || ''}${whatsapp_number}`;

	const onCardClick = () => {
		setActiveTab((prev) => ({
			...prev,
			hasNoFireBaseRoom : true,
			data              : {
				lead_organization_id    : null,
				lead_user_id            : null,
				user_name               : name,
				user_id,
				mobile_no               : whatsapp_number_eformat || whatsappMobileNumber,
				email,
				channel_type            : 'whatsapp',
				countryCode             : whatsapp_country_code || mobile_country_code,
				whatsapp_number_eformat : whatsapp_number || mobile_number,
				organization_id,
			},
			tab: 'message',
		}));
	};

	return (
		<>
			<div role="presentation" className={styles.container} onClick={onCardClick}>
				<div className={styles.dialer_icon_div} role="presentation" onClick={handleCall}>
					<IcMCall
						className={cl`${styles.call_icon} ${
							(!hasVoiceCallAccess)
								? styles.disable_call_icon : ''}`}
					/>
				</div>

				<div className={styles.content}>
					<div className={styles.agent_type}>Name : </div>
					<div className={isMobile ? styles.minimize : styles.name}>
						{name || 'NA'}
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Email : </div>
					<div className={isMobile ? styles.minimize : styles.email}>{email || '-'}</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Mobile No : </div>
					<div className={isMobile ? styles.minimize_number : styles.name}>
						{showNumber ? (
							<span>
								{`${mobile_country_code || ''} ${
									mobile_number
								}`}

							</span>
						) : (
							<span>
								{`${
									mobile_country_code || ''
								} ${getMaskedNumber({ number: mobile_number })}`}

							</span>
						)}
					</div>
					<div
						role="presentation"
						onClick={handleViewNumber}
						className={styles.show_number}
					>
						{showNumber ? 'Hide number' : 'Show number'}
					</div>
				</div>

				<div className={styles.user_work_scope}>
					{(lessList || []).map((item) => (
						<div className={styles.scope_name} key={item}>
							{startCase(item)}
						</div>
					))}
					{showMoreList && (
						<Tooltip
							content={(
								<div>
									{(moreList || []).map((item) => (
										<div className={styles.scope_name} key={item}>{startCase(item)}</div>
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

			<ReasonModal
				showReasonModal={showReasonModal}
				user={user}
				onClose={onClose}
				loading={loading}
				createUserContactRequest={createUserContactRequest}

			/>
		</>
	);
}

export default OrganizationUsers;
