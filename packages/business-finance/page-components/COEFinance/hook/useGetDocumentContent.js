import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';
import { ENTITY_NAME_LIST } from '../constants/ENTITY_NAME_LIST';

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
		const getSupplierMappedName = () => {
			let supplierMappedName = 'default';
			const formattedOrgName = orgName?.replaceAll(' ', '_')?.toLowerCase();
			ENTITY_NAME_LIST.forEach((singleName) => {
				if (formattedOrgName?.includes(singleName)) {
					supplierMappedName = singleName;
				}
			});
			return supplierMappedName;
		};

		const getContent = async () => {
			try {
				trigger({
					params: {
						file_url    : billDocumentUrl,
						entity_type : 'purchase_invoice',
						entity_name : getSupplierMappedName(),
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
		docContent   : JSON.stringify(apiData?.data)?.toLowerCase(),
		chargesTable : (apiData?.data?.charges_table),
	};
};

export default useGetDocumentContent;
