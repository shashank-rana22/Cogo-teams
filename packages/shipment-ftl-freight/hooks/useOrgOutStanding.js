import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
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

	const outstanding_by_reg_num = {};
	(proformaData?.list || []).forEach((org) => {
		outstanding_by_reg_num[org?.registration_number] = org;
	});

	useEffect(() => {
		if (org_reg_nums.length) {
			handleOutstandings();
		}
	}, [handleOutstandings, org_reg_nums.length]);

	return {
		handleOutstandings,
		loading,
		outstanding_by_reg_num,
	};
};

export default useOrgOutStanding;
