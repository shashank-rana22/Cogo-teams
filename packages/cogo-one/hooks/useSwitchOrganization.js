import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import {
	updateDoc,
	doc,
} from 'firebase/firestore';
import { useState } from 'react';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

const getUserDetails = ({ user_details = {}, selectedOrg = '' }) => {
	const { organizations = [], business_name = '' } = user_details || {};

	const selectedOrgDetails = organizations?.find((eachData) => eachData?.organization_id === selectedOrg);

	if (isEmpty(selectedOrgDetails)) {
		return {};
	}

	return {
		userDetails: {
			...user_details,
			...selectedOrgDetails,
		},
		prevBusinessName     : business_name,
		selectedBusinessName : selectedOrgDetails?.business_name,
	};
};
const getPayload = ({
	channelType = '',
	channelId = '',
	prevBusinessName = '',
	selectedBusinessName = '',
}) => ({
	channel           : channelType,
	channel_chat_id   : channelId,
	conversation_type : 'organization_switch',
	reason            : `${prevBusinessName} to ${selectedBusinessName}`,
});

const useSwitchOrganization = ({
	firestore = {},
	formattedData = {},
	setShowSwitchOrg = () => {},
}) => {
	const [loading, setLoading] = useState(false);

	const [selectedOrg, setSelectedOrg] = useState(formattedData?.user_details?.organization_id || '');

	const [, trigger] = useRequest({
		url    : '/create_cogoone_timeline',
		method : 'post',
	}, { manual: true });

	const { channel_type: channelType = '', id: channelId, user_details = {} } = formattedData || {};

	const switchOrganization = async () => {
		try {
			const {
				userDetails = {},
				prevBusinessName = '',
				selectedBusinessName = '',
			} = getUserDetails({ user_details, selectedOrg });

			if (isEmpty(userDetails)) {
				return;
			}

			setLoading(true);

			const roomRef = doc(
				firestore,
				`${FIRESTORE_PATH[channelType]}/${channelId}`,
			);
			await updateDoc(roomRef, { user_details: userDetails });

			trigger({
				data: getPayload({
					channelType,
					channelId,
					prevBusinessName,
					selectedBusinessName,
				}),
			});
			setShowSwitchOrg(false);
			Toast.success('Organization Switched Sucessfully');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		switchOrganization,
		setSelectedOrg,
		selectedOrg,
	};
};
export default useSwitchOrganization;
