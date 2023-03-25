import { Button } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

interface HandleCallProps {
	row?: object
}

function HandleCall({ row }: HandleCallProps) {
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));
	const dispatch = useDispatch();

	const handleVoiceCall = (item) => {
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
		<Button
			size="sm"
			themeType="primary"
			onClick={() => handleVoiceCall(row)}
		>
			Place Call
		</Button>
	);
}

export default HandleCall;
