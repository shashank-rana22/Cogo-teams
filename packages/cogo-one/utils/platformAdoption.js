const ACCOUNT_TYPE = {
	SP          : 'service_provider',
	CP          : 'importer_exporter',
	IE          : 'importer_exporter',
	trade_party : 'trade_parties',
};

export const formatAccountType = ({ tags = [] }) => ({
	service_provider  : { shortName: 'SP' },
	importer_exporter : { shortName: tags.includes('partner') ? 'CP' : 'IE' },

});

export const getOrgId = ({ orgData = {} }) => ({
	IE          : orgData?.organization?.id,
	CP          : orgData?.partner_user?.partner_id,
	SP          : orgData?.partner_user?.partner_id,
	trade_party : orgData?.trade_party?.id,
});

export const getCpSpPayload = ({ orgId = '', type = '', accountType = '', rejectReason = [], otherReason = '' }) => ({
	id                      : orgId || undefined,
	kyc_status              : type,
	account_type            : ACCOUNT_TYPE?.[accountType],
	kyc_rejection_reason    : otherReason || undefined,
	kyc_rejection_feedbacks : rejectReason || undefined,
});

export const getIePayload = ({ orgId = '', type = '', otherReason = '' }) => ({
	id                   : orgId || undefined,
	kyc_status           : type,
	kyc_rejection_reason : otherReason || undefined,
});

export const getTradePartyPayload = ({ orgId = '', type = '', otherReason = '' }) => ({
	id                  : orgId || undefined,
	verification_status : type,
	rejection_reason    : otherReason || undefined,
});

export const getPayload = ({
	description = '', end_time = '',
	start_time = '', subject = '', lead_organization_id = '',
	lead_user_id = '', user_id = '', organization_id = '',
}) => ({
	subject,
	description,
	category : 'meeting',
	metadata : {
		lead_user_id,
		user_id,
		lead_organization_id,
		organization_id,
	},
	frequency       : 'one_time',
	tags            : ['demo_request'],
	recurrence_rule : { type: 'normal' },
	validity_start  : start_time,
	start_time,
	validity_end    : end_time,
	end_time,

});
