import { useRequest } from '@cogoport/request';
import { getCookie } from '@cogoport/request/helpers/getCookieFromCtx';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

const useGetUserSessionMappings = () => {
	const current_time = new Date().getTime();

	const diff = Math.floor(current_time / 1000);

	const sessionTime = Math.max(diff, 0);

	const [timeLeft, setTimeLeft] = useState(sessionTime);
	const [checkIfSessionExpiring, setCheckIfSessionExpiring] = useState(false);

	const {
		profile,
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_user_session_mappings',
		method : 'get',
	}, { manual: true });

	const listApi = async () => {
		try {
			const cogo_admin_auth_token = getCookie('cogo-admin-auth-token');
			const payload = {
				parent_user_session_id: cogo_admin_auth_token,
			};
			const res = await trigger({
				params: payload,
			});

			if (!res.hasError) {
				dispatch(
					setProfileState({
						...profile,
						user_session_mappings: res?.data?.list,
					}),
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		listApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkSessionExpired = (users, currentTime) => {
		const users_expire_at = [];
		(users || []).forEach((user) => {
			if (user?.expire_at) {
				const expire_time = new Date(user?.expire_at).getTime();

				const diff_expire = Math.floor(expire_time / 1000);

				const sessionExpire = Math.max(diff_expire, 0);
				users_expire_at.push(sessionExpire);
			}
		});

		const user_expiry_time_bool_arr = [];
		users_expire_at.forEach((session_expiry_time) => {
			if (Number(currentTime) > Number(session_expiry_time - 30)) {
				user_expiry_time_bool_arr.push(true);
			}
		});

		if (user_expiry_time_bool_arr.includes(true)) {
			setCheckIfSessionExpiring(true);
		} else {
			setCheckIfSessionExpiring(false);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft((t) => t + 1);
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		checkSessionExpired(data?.list, timeLeft);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft]);

	return {
		data    : data?.list,
		loading,
		checkIfSessionExpiring,
		timeLeft,
		refetch : listApi,
	};
};

export default useGetUserSessionMappings;
