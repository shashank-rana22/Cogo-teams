import {
	IcMTick, IcMCross, IcMLineredo,
} from '@cogoport/icons-react';

const TEXT_MAPPING = {
	resolve_requested: {
		text             : 'Requested to Resolve',
		activity_payload : {
			type   : 'mark_as_resolved',
			status : 'resolved',
		},
		iconUrl: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/resolve_request.png',
	},
	reject_requested: {
		text             : 'Requested to Reject',
		activity_payload : {
			type   : 'rejected',
			status : 'rejected',
		},
		iconUrl: 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reject_request.png',
	},
};

const getTicketActivityMapping = ({ status, canPerformRequestAction = false }) => {
	const TICKET_ACTIVITY_MAPPING = {
		requested: {
			actions: [
				{
					tooltipContent  : 'Approve',
					activityPayload : TEXT_MAPPING?.[status]?.activity_payload || {},
					iconStyles      : {
						height : '15px',
						width  : '20px',
					},
					icon: IcMTick,
				}, {
					tooltipContent  : 'Deny',
					activityPayload : {
						type   : 'resolution_rejected',
						status : 'unresolved',
					},
					iconStyles: {
						height : '15px',
						width  : '20px',
					},
					icon: IcMCross,
				}],
			requestedText     : TEXT_MAPPING?.[status]?.text || status,
			canPerformActions : canPerformRequestAction,
			iconUrl           : TEXT_MAPPING?.[status]?.iconUrl || '',
		},
		closed: {
			actions: [
				{
					tooltipContent  : 'Reopen',
					activityPayload : {
						type   : 'reopened',
						status : 'reopened',
					},
					iconStyles: {
						height : '20px',
						width  : '20px',
					},
					icon: IcMLineredo,
				},
			],
			requestedText     : status,
			canPerformActions : true,
			iconUrl           : '',
		},
		unresolved: {
			actions: [
				{
					tooltipContent  : 'Resolve request',
					activityPayload : {
						type   : 'resolve_requested',
						status : 'resolve_requested',
					},
					iconStyles: {
						height : '15px',
						width  : '20px',
					},
					icon: IcMTick,
				},
				{
					tooltipContent  : 'Reject request',
					activityPayload : {
						type   : 'reject_requested',
						status : 'reject_requested',
					},
					iconStyles: {
						height : '15px',
						width  : '15px',
					},
					icon: IcMCross,
				},
			],
			requestedText     : status,
			canPerformActions : true,
			iconUrl           : '',
		},
	};
	const statusType = Object.keys(TICKET_ACTIVITY_MAPPING).find((val) => status.includes(val));
	return TICKET_ACTIVITY_MAPPING[statusType] || {};
};
export default getTicketActivityMapping;
