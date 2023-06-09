import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useOrgOutStanding = ({ org_reg_nums }) => {
	const [{ loading, data: proformaData }, trigger] = useRequest({
		url    : '/list_sage_ar_outstandings',
		method : 'GET',
		params : {
			filters: {
				registration_number: org_reg_nums,
			},
		},
	}, { manual: true });

	const handleOutstandings = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	const OUTSTANDING_BY_REG_NUM = {};
	(proformaData?.list || []).forEach((org) => {
		OUTSTANDING_BY_REG_NUM[org?.registration_number] = org;
	});

	useEffect(() => {
		if (org_reg_nums.length) {
			handleOutstandings();
		}
	}, [handleOutstandings, org_reg_nums.length]);

	return {
		handleOutstandings,
		loading,
		OUTSTANDING_BY_REG_NUM,
	};
};

export default useOrgOutStanding;
