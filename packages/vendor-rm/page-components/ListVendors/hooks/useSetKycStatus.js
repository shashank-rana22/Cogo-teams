function useSetKycStatus({
	setParams = () => {},
}) {
	const tagClick = ({ kycStatus: kyc_status }) => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				status     : 'active',
				kyc_status : kyc_status || undefined,
			},
		}));
	};

	return {
		tagClick,
	};
}

export default useSetKycStatus;
