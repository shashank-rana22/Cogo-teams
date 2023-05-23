import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCollectionActions = ({
	closePermissionModal,
	permissionModal,
	refetch,
	itemData,
	setSelectedId,
	setModalFinalPost,
}) => {
	const { accMode, paymentCode, entityType, paymentNumValue } = itemData || {};

	const [{ loading:deleteApiLoading }, deleteApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'delete_payments_accounts',
			method  : 'delete',
		},
		{ manual: true },
	);

	const [{ loading:postApiLoading }, postApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts',
			authKey : 'put_payments_accounts',
			method  : 'put',
		},
		{ manual: true },
	);

	const [{ loading:postToSageLoading }, postToSageApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts/post-to-sage',
			authKey : 'post_payments_accounts_post_to_sage',
			method  : 'post',
		},
		{ manual: true },
	);

	const [{ loading:finalPostFromSageLoading }, finalPostFromSageApiTrigger] = useRequestBf(
		{
			url     : '/payments/accounts/post-from-sage',
			authKey : 'post_payments_accounts_post_from_sage',
			method  : 'post',
		},
		{ manual: true },
	);

	const [{ data:finalSageInfoData, loading:finalSageInfoDataLoading }, finalSageInfoTrigger] = useRequestBf(
		{
			url     : '/payments/accounts/payment/final-post-sage-info',
			authKey : 'post_payments_accounts_payment_final_post_sage_info',
			method  : 'post',
		},
		{ manual: true },
	);

	const { user_data:userData } = useSelector(({ profile }:any) => ({
		user_data: profile?.user || {},
	}));
	const { isDelete } = permissionModal || {};
	const apiTrigger = isDelete ? deleteApiTrigger : postApiTrigger;
	const isCheck = isDelete ? 'Deleted Successfully' : 'Approved Successfully';
	const entryAction = async (id:string) => {
		try {
			const apiData = isDelete
				? {
					data: {
						paymentId     : id,
						accMode,
						performedById : userData?.id,
					},
				}
				: {
					data: {
						id,
						paymentDocumentStatus : 'APPROVED',
						accMode,
						paymentCode,
						uploadedBy            : userData?.name,
						updatedBy             : userData?.id,
					},
				};
			await apiTrigger(apiData);
			closePermissionModal();
			refetch();
			Toast.success(`${isCheck}`);
		} catch (err) {
			closePermissionModal();
			Toast.error(err?.response?.data?.message);
		}
	};

	const PostToSageAction = async (id:string) => {
		try {
			const resp = await postToSageApiTrigger({
				data: {
					id,
					performedBy: userData?.id,
				},
			});
			if (resp?.data?.data === 'Success.') {
				closePermissionModal();
				refetch();
				Toast.success('Post to sage successful');
			} else {
				Toast.error('Post to sage Failed');
			}
		} catch (err) {
			closePermissionModal();
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};
	const finalPostFromSage = async (id:string) => {
		try {
			const resp = await finalPostFromSageApiTrigger({
				data: {
					paymentIds  : [id],
					performedBy : userData?.id,
				},
			});
			refetch();
			if (resp?.data?.failedIdsList?.length > 0) {
				Toast.error(' could not final posted, please check!');
			} else {
				Toast.success('Document Final Posted From Sage Successfully');
			}
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	const finalPostSageInfo = async () => {
		try {
			await finalSageInfoTrigger({
				data: {
					paymentNumValue,
					entityCode: entityType,
					accMode,
				},
			});
			setSelectedId(undefined);
			setModalFinalPost(true);
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	return {
		entryAction,
		loading: postApiLoading || deleteApiLoading,
		finalPostSageInfo,
		finalSageInfoData,
		finalSageInfoDataLoading,
		finalPostFromSage,
		finalPostFromSageLoading,
		PostToSageAction,
		postToSageLoading,
	};
};

export default useCollectionActions;
