import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSourceFile = ({ modalData, uploader, setUploadModal }) => {
	const { month, entity } = modalData || {};
	const { push } = useRouter();
	const { profile } = useSelector((state) => state || {});

	const monthData = (month || []).split('-');

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
		const entityMapping = {
			101 : '6fd98605-9d5d-479d-9fac-cf905d292b88',
			201 : 'c7e1390d-ec41-477f-964b-55423ee84700',
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
			401 : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
			501 : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		};

		try {
			const res = await sourceFileUploadTrigger({
				data: {
					cogoEntityId    : entityMapping[entity],
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
			Toast.error(error?.response?.data?.message);
		}
	};

	return {
		uploadApi,
		sourceFileUploadLoading,
	};
};
export default useSourceFile;
