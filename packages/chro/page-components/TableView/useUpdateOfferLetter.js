// import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

function useUpdateOfferLetter() {
	const [params, setParams] = useState({});
	const userId = useSelector((s) => s?.profile?.user?.id);

	const [finalReview, setFinalReview] = useState('');

	const [{ data, loading }, refetch] = useRequest(
		{
			method : 'post',
			url    : '/update_employee_offer_letter',
			//   params,
		},
		{ manual: false },
	);

	// const formProps = useForm();

	const onFinalSubmit = async () => {
		try {
			  const combinedObject = { ...joiningBonus, ...salaryDetails, init: c };
			  console.log('combinedObject', combinedObject);

			const payload = {
				id                : '',
				performed_by_id   : 'user_id',
				performed_by_type : 'agent',
				metadata          : combinedObject,
				strip             : false,
				status            : 'active',
				rejectionReason,
			};

			await trigger({
				data: payload,
			});

			// Toast.success('Letter initiated!');
		} catch (err) {
			console.log('err :: ', err);
			// Toast.error(
			// 	getApiErrorString(err.response?.data) || 'Something went wrong',
			// );
		}
	};

	return {
		loading,
		data,
		// formProps,
		params,
		setParams,
		refetch,
		onFinalSubmit,
		// finalReview,
		// setFinalReview,
	};
}

export default useUpdateOfferLetter;
