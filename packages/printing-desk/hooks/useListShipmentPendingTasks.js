import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

import CONSTANTS from '../constants/constants';

const URL_MAPPING = {
	approved_awb : 'list',
	handed_over  : 'list',
};

const AUTH_KEY_MAPPING = {
	approved_awb : 'get_air_coe_pending_tasks_list',
	handed_over  : 'get_air_coe_pending_tasks_list',
};

const PAYLOAD_ITEM = {
	assignedStakeholder : 'service_ops2_docs',
	status              : 'completed',
	task                : ['upload_mawb_freight_certificate', 'upload_hawb_freight_certificate'],
	documentType        : ['draft_airway_bill'],
	documentState       : 'document_accepted',
	isDocDataRequired   : true,
};

const useListShipmentPendingTasks = ({ activeTab = 'approved_awb', filter = {}, relevantToMe }) => {
	const {
		user_data: userData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(CONSTANTS.START_PAGE);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : `/air-coe/pending-tasks/${URL_MAPPING[activeTab]}`,
			method  : 'get',
			authKey : `${AUTH_KEY_MAPPING[activeTab]}`,
		},
		{ manual: true },
	);

	const listAPI = useCallback(async () => {
		const payload = {
			approved_awb: {
				...PAYLOAD_ITEM,
				handedOverAtOriginAt : new Date().toISOString(),
				handedOverForTd      : false,

			},
			handed_over: {
				...PAYLOAD_ITEM,
				handedOverForTd: true,
			},
		};

		try {
			await trigger({
				params: {
					q       : (query || '').trim() || undefined,
					filters : {
					},
					...filter,
					...payload[activeTab],
					stakeholderId : relevantToMe ? userData.user.id : undefined,
					pageIndex     : page,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [activeTab, filter, page, query, relevantToMe, trigger, userData.user.id]);

	useEffect(() => {
		if (searchValue) {
			setPage(CONSTANTS.START_PAGE);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setPage(CONSTANTS.START_PAGE);
	}, [activeTab]);

	useEffect(() => {
		listAPI();
	}, [listAPI, page, query]);

	return {
		data: data?.data,
		loading,
		listAPI,
		setPage,
		page,
		searchValue,
		setSearchValue,
	};
};
export default useListShipmentPendingTasks;
