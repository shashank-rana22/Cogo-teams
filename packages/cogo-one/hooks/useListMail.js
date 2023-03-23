import { usePublicRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListMail({ activeSelect, senderMail }) {
	const [pagination, setPagination] = useState(1);

	const [{ data, loading }, trigger] = usePublicRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/list_mails`,
		method : 'get',
	}, { manual: true });

	const renderFolderName = () => {
		let folderType = '';
		if (activeSelect === 'inbox') {
			folderType = 'Inbox';
		}
		if (activeSelect === 'draft') {
			folderType = 'Drafts';
		}
		if (activeSelect === 'sent') {
			folderType = 'Sent Items';
		}
		if (activeSelect === 'spam') {
			folderType = 'Junk Email';
		}
		return folderType;
	};

	const getEmails = async () => {
		try {
			await trigger({
				params: {
					// email_address : 'dineshkumar.s@cogoport.com',
					email_address : senderMail,
					foldername    : renderFolderName(),
					page          : pagination,
					// page_limit : page_limit || 10 Inbox,
					// search,
					// filters    : JSON.stringify(filters),
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < data?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};

	useEffect(() => {
		getEmails();
	}, [pagination]);

	return {
		data,
		handleScroll,
		loading,
	};
}

export default useListMail;
