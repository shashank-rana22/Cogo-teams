import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useAuthRequest } from '@cogoport/request';
import useRequest from '@cogoport/request/hooks/useRequest';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { getCookie, setCookie, isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

// import redirections from '../utils/redirections';

// const EMPTY_PATH = '/empty';

const COOKIE_EXPIRY = -1;
const getFormattedPayload = ({ mobileNumber = {}, otpId = '', otpValue = '' }) => ({
	id                  : otpId,
	mobile_otp          : otpValue,
	mobile_number       : mobileNumber?.number,
	mobile_country_code : mobileNumber?.country_code,
	auth_scope          : 'partner',
	platform            : 'admin',
});

const useLoginAuthenticate = ({
	mobileNumber = {},
	otpId = '',
	otpValue = '',
	type = '',
}) => {
	const router = useRouter();

	const { t } = useTranslation(['login']);

	const { _initialized, ...profile } = useSelector((s) => s.profile);

	const dispatch = useDispatch();
	const { source = '' } = router.query || {};

	const cogo_admin_auth_token = getCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME);

	const [{ loading: loginLoading }, trigger] = useRequest({
		url    : '/login_user',
		method : 'post',
	}, { manual: true });

	const [{ loading: otpLoading }, triggerOtp] = useRequest(
		{
			url    : 'login_user_with_mobile',
			method : 'post',
		},
		{ manual: true },
	);
	const [{ loading: sessionLoading }, triggerSession] = useAuthRequest({
		url    : '/get_user_session',
		method : 'get',
	}, { manual: true });

	const [{ loading: userSessionMappingLoading }, triggerUserSessionMapping] = useAuthRequest({
		url    : '/get_user_session_mappings',
		method : 'get',
	}, { manual: true });

	const [{ loading: updateSessionMappingLoading }, triggerUpdateSessionMapping] = useAuthRequest({
		url    : '/update_parent_and_child_user_session_mappings',
		method : 'post',
	}, { manual: true });

	const getUserSessionMappings = async () => {
		try {
			const sessionData = await triggerUserSessionMapping({
				params: { parent_user_session_id: cogo_admin_auth_token },
			});
			if (!sessionData.hasError) {
				if (isEmpty(sessionData?.data?.list)) {
					setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, 'expired', COOKIE_EXPIRY);
					setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', COOKIE_EXPIRY);
				}
			}
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (source !== 'add_account' && cogo_admin_auth_token) {
			getUserSessionMappings();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const redirectFunction = async () => {
		// const configs = redirections(profile);
		// const redirectPath = decodeURIComponent(redirect_path);

		// if (redirectPath) {
		// 	window.location.href = `/v2/${profile?.partner?.id}${redirectPath || EMPTY_PATH}`;
		// } else if (configs?.href?.includes('/v2')) {
		// 	const replaceHref = configs?.href?.replace('/v2', '');

		// 	window.location.href = `/v2/${profile?.partner?.id}${replaceHref || EMPTY_PATH}`;
		// } else if (!configs?.href?.includes('/v2') && process.env.NODE_ENV === 'production') {
		// 	// eslint-disable-next-line no-undef
		// 	window.location.href = `/${profile?.partner?.id}${configs?.href || EMPTY_PATH}`;
		// } else {
		// 	await router.push(configs?.href || EMPTY_PATH, configs?.as || EMPTY_PATH);
		// }
		await router.push('/cogo-one/omni-channel');
	};

	useEffect(() => {
		if (!isEmpty(profile) && source !== 'add_account') {
			redirectFunction();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile, router, source]);

	const onSubmit = async (values, e) => {
		e?.preventDefault();
		try {
			let is_already_added_email = false;
			let user_data = {};
			const userPayload = getFormattedPayload({ mobileNumber, otpId, otpValue });
			if (cogo_admin_auth_token) {
				const mapping_response = await triggerUserSessionMapping({
					params: { parent_user_session_id: cogo_admin_auth_token },
				});

				if (!mapping_response.hasError) {
					(mapping_response?.data?.list || []).forEach((user) => {
						if (values?.email === user?.user_data?.email) {
							user_data = {
								...user,
								user_active: true,
							};
						}

						return null;
					});

					is_already_added_email = !!user_data?.user_active;
				}
			}

			if (is_already_added_email && source === 'add_account') {
				Toast.error(t('login:already_login_toast_error'));

				return;
			}
			let response = {};

			if (type === 'eamil_auth') {
				response = await trigger({
					data: {
						...values,
						auth_scope   : 'partner',
						platform     : 'admin',
						parent_token : cogo_admin_auth_token || undefined,
					},
				});
			}

			if (type === 'otp_auth') {
				response = await triggerOtp({
					data: userPayload,
				});
			}

			const { token } = response?.data || {};

			const payload = {
				active_user_session_id : token,
				parent_user_session_id : cogo_admin_auth_token || undefined,
			};

			const updateSession = await triggerUpdateSessionMapping({
				data: payload,
			});

			const { parent_token } = (updateSession || {}).data || {};

			setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, parent_token);
			setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);

			const res = await triggerSession();

			const { partner = {}, user = {} } = res.data || {};

			const { preferred_languages } = user || {};

			const userLanguagePreferenece = preferred_languages?.[GLOBAL_CONSTANTS.zeroth_index]
			|| GLOBAL_CONSTANTS.default_preferred_language;

			dispatch(setProfileState(res.data));
			setCookie('parent_entity_id', partner.id);
			setCookie('lang_preference', userLanguagePreferenece);

			if (source === 'add_account') {
				// eslint-disable-next-line no-undef
				window.location.href = '/';
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || t('login:failed_to_login_toast_error'));
		}
	};

	return {
		onSubmit,
		loading: loginLoading || sessionLoading || updateSessionMappingLoading
		|| userSessionMappingLoading || otpLoading,
		source,
	};
};

export default useLoginAuthenticate;
