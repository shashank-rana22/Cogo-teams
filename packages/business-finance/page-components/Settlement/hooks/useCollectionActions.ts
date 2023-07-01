import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface PermissionInterface {
	show?:boolean
	id?:string
	isDelete?:boolean
}
interface SelectedInterface {
	id?:string
}
interface CollectionActionInterface {
	closePermissionModal?:() => void
	permissionModal?: PermissionInterface
	refetch?: () => void
	itemData?:{
		customerName?:string
		accCode?:string
		bankAccountNumber?:string
		orgSerialId?:string
		bankName?:string
		paymentNumValue?:string
		amount?:string
		utr?:string
		entityType?:string
		currency?:string
		id?:string
		paymentDocumentStatus?:string
		accMode?:string
		paymentCode?:string
		sageOrganizationId?:string
	}
	setSelectedId?: React.Dispatch<React.SetStateAction<SelectedInterface>>
	setModalFinalPost?: React.Dispatch<React.SetStateAction<boolean>>
}
const useCollectionActions = ({
	closePermissionModal,
	permissionModal,
	refetch,
	itemData,
	setSelectedId,
	setModalFinalPost,
}:CollectionActionInterface) => {
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

	const { user_data:userData } = useSelector(({ profile }:{ profile?:{ user?:{ id?:string, name?:string } } }) => ({
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
			refetch();
			Toast.success(`${isCheck}`);
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		} finally {
			closePermissionModal();
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
				refetch();
				Toast.success('Post to sage successful');
			} else {
				Toast.error('Post to sage Failed');
			}
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		} finally {
			closePermissionModal();
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
