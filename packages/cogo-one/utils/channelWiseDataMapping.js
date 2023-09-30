export const dataMapping = ({
	user_data, user_number, voiceOrgId, user_id, messageName, userMessageMobileNumber,
	lead_user_details, email, organization_id, lead_user_id,
}) => ({
	voice: {
		userId        : user_data?.id,
		name          : user_data?.name,
		userEmail     : user_data?.email,
		mobile_number : user_number,
		orgId         : voiceOrgId,
		leadUserId    : null,
	},
	message: {
		userId        : user_id,
		name          : messageName || lead_user_details?.name,
		userEmail     : email || lead_user_details?.email,
		mobile_number : userMessageMobileNumber,
		orgId         : organization_id,
		leadUserId    : lead_user_id || lead_user_details?.lead_user_id,
	},
	firebase_emails: {
		userId        : user_id,
		name          : messageName || lead_user_details?.name,
		userEmail     : email || lead_user_details?.email,
		mobile_number : userMessageMobileNumber,
		orgId         : organization_id,
		leadUserId    : lead_user_id || lead_user_details?.lead_user_id,
	},
});
