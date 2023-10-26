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
	IE          : orgData?.organization_id,
	CP          : orgData?.organization_id,
	SP          : orgData?.organization_id,
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
