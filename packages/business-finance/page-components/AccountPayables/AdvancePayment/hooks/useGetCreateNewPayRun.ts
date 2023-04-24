import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
// import { useState } from 'react';

interface FilterProps {
	activeEntity: string;
	currency:string;
}
const useGetCreateNewPayRun = ({ activeEntity, currency }:FilterProps) => {
	// const [filters, setFilters] = useState({
	// 	pageIndex: 1,
	// });
	// const { pageIndex } = filters || {};
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user, session_type:sessionType } = UserData;
	const { id:userId = '', name } = user || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun/advance-payment',
			method  : 'post',
			authKey : 'post_purchase_payrun_advance_payment',
		},
		{ manual: true, autoCancel: false },
	);

	const getCreateNewPayRun = async () => {
		let resp = {};
		try {
			resp = await trigger({
				data: {
					type            : 'ADVANCE_DOCUMENT',
					currency,
					entityCode      : activeEntity,
					list            : [],
					performedBy     : userId,
					performedByName : name,
					performedByType : sessionType,
				},
			});
		} catch (err) {
			Toast.error(err.meessage);
		}
		return resp;
	};

	return {
		createNewPayRunData: data,
		loading,
		// filters,
		// setFilters,
		getCreateNewPayRun,
	};
};
export default useGetCreateNewPayRun;
