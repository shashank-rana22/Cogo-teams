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

const MAX_SHOW_LENGTH = 2;
const MIN_SHOW_LENGTH = 0;

function OrganizationUsers({ user = {}, hasVoiceCallAccess = false }) {
	const dispatch = useDispatch();

	const [maskConfig, setMaskConfig] = useState({
		showNumber      : false,
		showReasonModal : false,
	});

	const { loading = false, createUserContactRequest = () => {} } = useCreateUserContactRequest({ setMaskConfig });

	const { showNumber, showReasonModal } = maskConfig || {};

	const {
		user_id = '', email = '', mobile_country_code = '', mobile_number = '', name = '',
		organization_id = '', work_scopes = [],
	} = user || {};

	const lessList = (work_scopes || []).slice(MIN_SHOW_LENGTH, MAX_SHOW_LENGTH);
	const moreList = (work_scopes || []).slice(MAX_SHOW_LENGTH);
	const showMoreList = (work_scopes || []).length > MAX_SHOW_LENGTH;

	const onClose = ({ reset }) => {
		setMaskConfig((pv) => ({ ...pv, showReasonModal: false }));
		reset();
	};

	const handleViewNumber = () => {
		if (showNumber) {
			setMaskConfig((pv) => ({ ...pv, showNumber: false }));
		} else {
			setMaskConfig((pv) => ({ ...pv, showReasonModal: true }));
		}
	};

	const handleCall = () => {
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

	return (
		<>
			<div className={styles.container}>
				<div className={styles.dialer_icon_div} role="presentation" onClick={handleCall}>
					<IcMCall
						className={cl`${styles.call_icon} ${
							(!hasVoiceCallAccess)
								? styles.disable_call_icon : ''}`}
					/>
				</div>

				<div className={styles.content}>
					<div className={styles.agent_type}>Name : </div>
					<div className={styles.name}>
						{name || 'NA'}
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Email : </div>
					<div className={styles.name}>{email || '-'}</div>
				</div>
				<div className={styles.content}>
					<div className={styles.type}>Mobile No : </div>
					<div className={styles.name}>
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
								} ${getMaskedNumber(mobile_number)}`}

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
