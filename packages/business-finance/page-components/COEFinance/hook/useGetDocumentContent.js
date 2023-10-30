import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';
import getSupplierMappedName from '../utils/getSupplierMappedName';

const useGetDocumentContent = ({ data }) => {
	const { billDocumentUrl } = data?.bill || {};
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
						entity_type : 'purchase_invoice',
						entity_name : getSupplierMappedName({ orgName }),
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		};

		if (billDocumentUrl) { getContent(); }
	}, [trigger, billDocumentUrl, orgName]);

	return {
		contentLoading,
		docContent   : apiData?.data,
		chargesTable : (apiData?.data?.charges_table),
	};
};

export default useGetDocumentContent;
