import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { entityMappingData } from '../P&L/PLStatement/constant';

const useSourceFile = ({ modalData, uploader, setUploadModal }) => {
	const { month, entity } = modalData || {};
	const { push } = useRouter();
	const { profile } = useSelector((state) => state || {});

	const monthData = (month || '')?.split('-');

	const [
		{ loading:sourceFileUploadLoading },
		sourceFileUploadTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/source-file',
			method  : 'post',
			authKey : 'post_pnl_statement_source_file',
		},
		{ manual: true },
	);
	const uploadApi = async () => {
		try {
			const res = await sourceFileUploadTrigger({
				data: {
					cogoEntityId    : entityMappingData[entity],
					month           : monthData[1] || undefined,
					year            : monthData[0] || undefined,
					trialBalanceUrl : uploader,
					createdBy       : profile.partner?.id,
					updatedBy       : profile?.user?.id,
					uploadedByName  : profile?.user?.name,
				},
			});
			if (res.data) {
				push(
					`/business-finance/cogo-book/[active_tab]/[view]/upload-report?month=${modalData?.month}
				    &entity=${modalData?.entity}&id=${res?.data?.data}`,
					`/business-finance/cogo-book/pl_statement/source_file/upload-report?month=${modalData?.month}
				    &entity=${modalData?.entity}&id=${res?.data?.data}`,
				);
				setUploadModal(false);
			}
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
			Toast.error('Something Went Wrong');
		}
	};

	return {
		uploadApi,
		sourceFileUploadLoading,
	};
};
export default useSourceFile;
