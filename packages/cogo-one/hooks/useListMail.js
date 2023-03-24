import { usePublicRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import { renderFolderName } from '../constants/MAIL_CONSTANT';

function useListMail({ activeSelect, senderMail }) {
	const [listData, setListData] = useState({ value: [], isLastPage: false });

	const [pagination, setPagination] = useState(1);
	const PAGE_LIMIT = 10;
	const [{ loading }, trigger] = usePublicRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/list_mails`,
		method : 'get',
	}, { manual: true });

	const getEmails = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					email_address : senderMail,
					foldername    : renderFolderName[activeSelect],
					page          : pagination,
					page_limit    : PAGE_LIMIT,
				},
			});

			if (res.data) {
				const { value = [] } = res?.data || {};
				const isLastPage = (value.length || 0) < PAGE_LIMIT;
				setListData((p) => ({ value: [...(p.value || []), ...(value || [])], isLastPage }));
			}
		} catch (err) {
			// console.log(err);
		}
	}, [activeSelect, trigger, pagination, senderMail]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollTop + clientHeight >= scrollHeight;
		if (reachBottom && !loading && !listData?.isLastPage) {
			setPagination((p) => p + 1);
		}
	};

	useEffect(() => {
		getEmails();
	}, [getEmails]);

	return {
		listData,
		handleScroll,
		loading,
		getEmails,
		setPagination,
		setListData,
	};
}

export default useListMail;
