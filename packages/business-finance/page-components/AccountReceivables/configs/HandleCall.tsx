import { Button } from '@cogoport/components';
import { IcMCall } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React, { useState } from 'react';

import LogModal from '../components/Outstanding/LogModal';

import styles from './styles.module.css';

interface HandleCallProps {
	row?: object
}

function HandleCall({ row = {} }: HandleCallProps) {
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));
	const dispatch = useDispatch();

	const [showLog, setShowLog] = useState(false);

	const handleVoiceCall = (item) => {
		setShowLog(true);
		dispatch(
			setProfileState({
				...profileData,
				voice_call: {
					mobile_country_code : item?.mobile_country_code,
					mobile_number       : item?.mobile_number,
					name                : item?.name,
					organization_name   : item?.name,
					userId              : item?.user_id,
					orgId:
						item?.organization_id
						|| item?.partner?.twin_importer_exporter_id
						|| item?.partner?.twin_service_provider_id,
					showCallModal       : true,
					destTrue            : false,
					showActiveCallModal : true,
					showFeedbackModal   : false,
					minimizeModal       : true,
					callUser            : true,
					inCall              : false,
					endCall             : false,
				},
			}),
		);
	};

	return (
		<div>
			<Button
				size="sm"
				themeType="primary"
				onClick={() => handleVoiceCall(row)}
				className={styles.call_btn}
			>
				<IcMCall height={15} width={15} />
			</Button>
			<LogModal showLog={showLog} setShowLog={setShowLog} />
		</div>
	);
}

export default HandleCall;
