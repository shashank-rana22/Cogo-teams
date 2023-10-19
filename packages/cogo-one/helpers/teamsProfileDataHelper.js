import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function getformattedGroupData({ groupMembersData = [], isDraft = false, membersList = [] }) {
	if (isDraft) {
		return groupMembersData?.map((eachData) => ({
			name          : eachData?.name,
			id            : eachData?.id,
			email         : eachData?.agent_data?.email,
			mobile_number : eachData?.agent_data?.mobile_number,
			location      : eachData?.office_location?.display_name,
			is_admin      : eachData?.is_admin || false,
		})) || [];
	}

	return membersList?.map((eachData) => ({
		name          : eachData?.partner?.name,
		id            : eachData?.user_id,
		email         : eachData?.partner?.email,
		mobile_number : eachData?.partner?.mobile_number,
		location      : eachData?.partner?.office_location?.display_name,
		designation   : eachData?.partner?.roles_data?.[GLOBAL_CONSTANTS.zeroth_index]?.name || '',
		is_admin      : eachData?.access_type === 'owner' || false,
	})) || null;
}

export { getformattedGroupData };
