/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { setCookie, getCookie } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useGetUserSessionMappings = () => {
	const {
		profile,
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const current_time = new Date().getTime();

	const diff = Math.floor(current_time / 1000);

	const sessionTime = Math.max(diff, 0);

	const [timeLeft, setTimeLeft] = useState(sessionTime);
	const [checkIfSessionExpiring, setCheckIfSessionExpiring] = useState(false);

	const [{ data, mappingsloading }, trigger] = useRequest({
		url    : '/get_user_session_mappings',
		method : 'get',
	}, { manual: true });

	const [{ loading: deleteLoading }, deleteSessionTrigger] = useRequest({
		url    : '/delete_user_session',
		method : 'delete',
	}, { manual: true });

	const [{ loading: removeLoading }, removeSessionTrigger] = useRequest({
		url    : '/remove_user_sessions',
		method : 'delete',
	}, { manual: true });

	const [{ loading: updateLoading }, updateTrigger] = useRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: true });

	const listApi = async () => {
		try {
			const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

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

	const removeUser = async (user) => {
		try {
			const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
			const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

			const activeUserCheck = profile?.user?.id === user?.user_id;

			let payload = {};

			if (activeUserCheck) {
				payload = {
					token,
				};
			} else {
				payload = {
					active_token     : token,
					parent_token     : cogo_admin_auth_token,
					tokens_to_remove : [user?.user_session_id],
				};
			}

			const deleteTrigger = profile?.user?.id === user?.user_id ? deleteSessionTrigger : removeSessionTrigger;

			const deleteResponse = await deleteTrigger({
				params: {
					...payload,
				},
			});

			if (!deleteResponse.hasError) {
				const updateResponse = await updateTrigger({
					data: {
						active_user_session_id : token,
						parent_user_session_id : cogo_admin_auth_token,
					},
				});

				if (!updateResponse.hasError) {
					const { parent_token = '' } = (updateResponse || {}).data || {};

					if (activeUserCheck) {
						if (
							parent_token
							&& profile?.user_session_mappings?.length > 1
						) {
							setCookie(
								process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME,
								parent_token,
							);
							setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, parent_token);
							window.location.href = '/';
						}

						if (
							profile?.user_session_mappings?.length === 1
							|| !parent_token
						) {
							setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, 'expired', -1);
							setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', -1);
							window.location.href = '/v2/login';
						}
					}

					if (!activeUserCheck) {
						setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, parent_token);
						Toast.error(`Session for ${user?.user_data?.name} has expired`);
						listApi();
					}
				}
			}
		} catch (error) {
			console.log('error ::', error);
		}
	};

	const expireSession = () => {
		(profile?.user_session_mappings || []).forEach((user) => {
			const expire_at = user?.expire_at;
			const expire_time = new Date(expire_at).getTime();

			if (timeLeft === Math.floor(expire_time / 1000)) {
				removeUser(user);
			}
		});
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft((t) => t + 1);
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		checkSessionExpired(data?.list, timeLeft);
	}, [timeLeft, data]);

	useEffect(() => {
		expireSession();
	}, [timeLeft]);

	const loading = mappingsloading || updateLoading || deleteLoading || removeLoading;

	return {
		data    : data?.list,
		loading,
		checkIfSessionExpiring,
		setTimeLeft,
		timeLeft,
		refetch : listApi,
	};
};

export default useGetUserSessionMappings;
