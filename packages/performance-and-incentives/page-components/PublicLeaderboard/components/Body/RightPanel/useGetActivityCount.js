function useGetActivityCount() {
	const data = {
		engagement: {
			call_received  : 55,
			chats_attended : 122,
			emails_sent    : 70,
			missed_calls   : 0,
			calls_made     : 90,
			chats_missed   : 100,
		},
		accounts: {
			new_activations   : 21,
			reactivations     : 23,
			kyc_verifications : 0,
			true_activations  : 430,
			retentions        : 1,
		},
		enrichment: {
			contacts_enriched   : 32,
			feedbacks_submitted : 0,
		},
		shipments: {
			new_sids              : 21,
			sids_cancelled        : 0,
			quotations_sent       : 12,
			new_services_unlocked : 43,
		},
	};

	return {
		data,
	};
}

export default useGetActivityCount;
