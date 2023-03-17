import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

function useListAnnouncements() {
	const [searchInput, setSearchInput] = useState('');
	const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
	const [activeList, setActiveList] = useState('active');
	const [page, setPage] = useState(1);
	const [paginationData, setPaginationData] = useState({});

	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_announcements',
	}, { manual: true });

	const [{ error }, updateTrigger] = useRequest({ url: '/update_announcement', method: 'post' }, { manual: true });

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const getAnnouncementList = useCallback(async () => {
		try {
			const res =	await trigger({
				params: {
					filters: {
						status            : activeList,
						auth_function     : scope === 'partner' ? roleFunction : undefined,
						auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
						country_id,

					},
					user_id       : id,
					page,
					is_admin_view : true,

				},

			});
			setPaginationData(
				{
					total_count : res?.data?.total_count,
					page_limit  : res?.data?.page_limit,
				},
			);
		} catch (err) {
			console.log(err);
		}
	}, [activeList, country_id, id, page, roleFunction, roleSubFunction, scope, trigger]);

	const deleteAnnouncement = async (announcement_id) => {
		try {
			const response = await updateTrigger(
				{ data: { id: announcement_id, status: 'inactive' } },
			);
			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Announcement deleted successfully...');
			getAnnouncementList();
		} catch (err) {
			Toast.error(err?.message);
			console.log('Error', error);
		}
	};
	useEffect(() => {
		getAnnouncementList();
	}, [page, activeList, getAnnouncementList]);

	return {
		page,
		setPage,
		paginationData,
		data,
		searchInput,
		setSearchInput,
		activeList,
		deleteAnnouncement,
		currentAnnouncement,
		setCurrentAnnouncement,
		setActiveList,
		loading,
	};
}

export default useListAnnouncements;
