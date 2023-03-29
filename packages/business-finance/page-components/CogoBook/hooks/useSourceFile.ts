import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSourceFile = ({ modalData, uploader, setUploadModal }) => {
	const { month, entity } = modalData || {};
	const { push } = useRouter();
	const { profile } = useSelector((state) => state || {});

	const [monthName, year] = (month.match(/(\w+)\s+(\d{4})/) || []).slice(1);

	const monthData = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

	const numericDate = `${year}-${monthData.toString().padStart(2, '0')}-01`;

	const [
		{ data:sourceFileUpload, loading:sourceFileUploadLoading },
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
			301 : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		};

		try {
			const res = await sourceFileUploadTrigger({
				data: {
					cogoEntityId    : entityMapping[entity],
					period          : numericDate,
					trialBalanceUrl : uploader,
					createdBy       : profile.partner?.id,
					updatedBy       : profile?.user?.id,
				},
			});
			if (res.data) {
				push(
					`/business-finance/cogo-book/[active_tab]/[view]/upload-report?month=${modalData?.month}
				    &entity=${modalData?.entity}`,
					`/business-finance/cogo-book/pl_statement/source_file/upload-report?month=${modalData?.month}
				    &entity=${modalData?.entity}`,
				);
				setUploadModal(false);
			}
		} catch (error) {
			console.log(error, 'error');
		}
	};

	return {
		sourceFileUpload,
		uploadApi,
		sourceFileUploadLoading,
	};
};
export default useSourceFile;
