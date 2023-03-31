import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestAir } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

const useListShipmentPendingTasks = ({ activeTab = 'new_awb', filter = {}, relevantToMe }) => {
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
			url     : '/air-coe/pending-tasks/list',
			method  : 'get',
			authKey : 'get_air_coe_pending_tasks_list',
		},
		{ manual: true },
	);

	const listAPi = useCallback(() => {
		(async () => {
			const payload = {
				new_awb: {
					assignedStakeholder : 'service_ops2_docs',
					status              : 'pending',
					task                : ['upload_mawb_freight_certificate'],
				},
				approval_pending: {
					assignedStakeholder : 'service_ops2_docs',
					status              : 'pending',
					task                : ['approve_draft_airway_bill', 'amend_draft_airway_bill'],
					documentType        : 'draft_airway_bill',
					isDocDataRequired   : true,
				},
				approved_awb: {
					assignedStakeholder : 'service_ops2_docs',
					status              : 'completed',
					task                : ['upload_mawb_freight_certificate'],
					documentType        : 'draft_airway_bill',
					documentState       : 'document_accepted',
					isDocDataRequired   : true,
				},
				final_awb: {
					assignedStakeholder : 'service_ops2_docs',
					status              : 'pending',
					task                : ['upload_airway_bill'],
				},
			};
			if (searchValue) {
				setPage(1);
			}

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
				console.log(err);
			}
		})();
	}, [activeTab, filter, page, query, relevantToMe, searchValue, trigger, userData.user.id]);

	useEffect(() => {
		debounceQuery(searchValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		setPage(1);
	}, [activeTab]);

	useEffect(() => {
		listAPi();
	}, [listAPi, page, query]);

	return {
		data,
		loading,
		listAPi,
		setPage,
		page,
		searchValue,
		setSearchValue,
	};
};
export default useListShipmentPendingTasks;
