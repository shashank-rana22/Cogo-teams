import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListAnnouncements() {
	const [searchInput, setSearchInput] = useState('');
	const [activeList, setActiveList] = useState('active');
	const [page, setPage] = useState(1);

	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_announcement',
	}, { manual: true });

	const [{ error }, updateTrigger] = useRequest({ url: '/update_announcement', method: 'post' }, { manual: true });

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const getAnnouncementList = async () => {
		try {
			const res =	await trigger({
				params: {
					filters: {
						status            : 'active',
						auth_function     : scope === 'partner' ? roleFunction : undefined,
						auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

					},
					country_id,
					user_id       : id,
					page,
					is_admin_view : true,

				},

			});
			console.log('res', res);
		} catch (err) {
			console.log(err);
		}
	};

	const deactivateQuestion = async (id) => {
		try {
			await updateTrigger(
				{ data: { id, status: 'inactive' } },
			);
			getAnnouncementList();
		} catch { console.log('Error', error); }
	};
	useEffect(() => {
		getAnnouncementList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, activeList]);
	return {
		page,
		setPage,
		data,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
		questionListLoading: loading,
	};
}

export default useListAnnouncements;
