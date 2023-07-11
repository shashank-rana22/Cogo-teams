import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

const URL_MAPPING = {
	approved_awb : 'list',
	amendment    : 'amend/list',
};

const AUTH_KEY_MAPPING = {
	approved_awb : 'get_air_coe_pending_tasks_list',
	amendment    : 'get_air_coe_pending_tasks_amend_list',
};

const useListShipmentPendingTasks = ({ activeTab = 'approved_awb', filter = {}, relevantToMe }) => {
	const {
		user_data: userData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequestAir(
		{
			url     : `/air-coe/pending-tasks/${URL_MAPPING[activeTab]}`,
			method  : 'get',
			authKey : `${AUTH_KEY_MAPPING[activeTab]}`,
		},
		{ manual: true },
	);

	const listAPI = useCallback(() => {
		const payload = {
			new_awb: {
				assignedStakeholder : 'service_ops2_docs',
				status              : 'pending',
				task                : ['upload_mawb_freight_certificate', 'upload_hawb_freight_certificate'],
			},
			approval_pending: {
				assignedStakeholder : 'service_ops2_docs',
				status              : 'pending',
				task                : ['approve_draft_airway_bill', 'amend_draft_airway_bill'],
				documentType        : ['draft_airway_bill'],
				isDocDataRequired   : true,
			},
			approved_awb: {
				assignedStakeholder : 'service_ops2_docs',
				status              : 'completed',
				task                : ['upload_mawb_freight_certificate', 'upload_hawb_freight_certificate'],
				documentType        : ['draft_airway_bill'],
				documentState       : 'document_accepted',
				isDocDataRequired   : true,
			},
			final_awb: {
				assignedStakeholder : 'service_ops2_docs',
				status              : 'pending',
				task                : ['upload_airway_bill'],
			},
			amendment: {
				assignedStakeholder : 'service_ops2_docs',
				status              : 'pending',
				task                : ['amend_draft_airway_bill', 'amend_draft_house_airway_bill'],
				documentType        : ['draft_airway_bill', 'draft_house_airway_bill'],
				documentState       : 'document_amendment_requested',
			},
		};

		(async () => {
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
		})();
	}, [activeTab, filter, page, query, relevantToMe, trigger, userData.user.id]);

	useEffect(() => {
		if (searchValue) {
			setPage(1);
		}
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		setPage(1);
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
