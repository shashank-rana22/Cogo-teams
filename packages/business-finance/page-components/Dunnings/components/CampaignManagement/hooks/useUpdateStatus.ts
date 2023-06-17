import { useRequestBf } from "@cogoport/request";
import { useSelector } from "@cogoport/store";

function useUpdateStatus(){
    const {
        profile,
	} = useSelector((state:any) => state);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/update-status',
			method  : 'put',
			authKey : 'put_payments_dunning_update_status',
		},
		{ manual: true },
	);




	const changeStatus = async ({id,status}) => {
		try {
			 await trigger({
				data:{
                    id: id,
                    updatedBy: profile?.user?.id,
                    status: status,
				}
			 });
		} catch (err) {
			console.log('err-',err);
		}
	};

	

	return {
		changeStatus,
		loading,
	};
}

export default useUpdateStatus;