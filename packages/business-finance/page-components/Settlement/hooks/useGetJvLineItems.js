import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface Props {
	parentJVId: string;
}

const useGetJvLineItems = ({ parentJVId }:Props) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/journal-voucher/jv-line-items-list',
			authKey : 'get_payments_journal_voucher_jv_line_items_list',
			method  : 'get',
		},
		{ manual: true },
	);

	useEffect(() => {
		trigger({
			params: {
				page      : 1,
				pageLimit : 10,
				parentJVId,
			},
		});
	}, [trigger, parentJVId]);

	return {
		data,
		loading,
	};
};

export default useGetJvLineItems;
