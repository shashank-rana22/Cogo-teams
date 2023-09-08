import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import { ENTITY_NAME_LIST } from '../constants/ENTITY_NAME_LIST';

const useGetDocumentContent = ({ data }) => {
	const { billDocumentUrl, billType } = data?.bill || {};
	const orgName = data?.sellerDetail?.organizationName;

	const [
		{ data:apiData, loading: contentLoading },
		trigger,
	] = useRequestBf(
		{
			url    : 'https://lens.dev.cogoport.io/cogolens/detect',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		const getContent = async () => {
			try {
				trigger({
					params: {
						file_url    : billDocumentUrl,
						entity_type : billType,
						entity_name : ENTITY_NAME_LIST.includes(orgName) || 'default',
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		};

		if (billDocumentUrl) { getContent(); }
	}, [trigger, billDocumentUrl, billType, orgName]);

	return {
		contentLoading,
		docContent: JSON.stringify(apiData?.data),
	};
};

export default useGetDocumentContent;
