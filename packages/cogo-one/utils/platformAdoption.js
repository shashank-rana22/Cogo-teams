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

export const getCpSpPayload = ({ orgId = '', type = '', accountType = '', rejectReason = '' }) => ({
	id                   : orgId || undefined,
	kyc_status           : type,
	account_type         : ACCOUNT_TYPE?.[accountType],
	kyc_rejection_reason : rejectReason || undefined,
});

export const getIePayload = ({ orgId = '', type = '', rejectReason = '' }) => ({
	id                   : orgId || undefined,
	kyc_status           : type,
	kyc_rejection_reason : rejectReason || undefined,
});

export const getTradePartyPayload = ({ orgId = '', type = '', rejectReason = '' }) => ({
	id                  : orgId || undefined,
	verification_status : type,
	rejection_reason    : rejectReason || undefined,
});

export const getPayload = ({
	description = '', end_date = '', end_time = '', start_date = '',
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
	frequency       : 'daily',
	tags            : ['demo_request'],
	recurrence_rule : {
		type         : 'normal',
		repeat_after : 1,
		unit         : 'day',
	},
	validity_start : start_date,
	start_time,
	validity_end   : end_date,
	end_time,

});
