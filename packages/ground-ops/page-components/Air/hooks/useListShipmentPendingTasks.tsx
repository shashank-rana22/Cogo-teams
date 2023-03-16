import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentPendingTasks = ({ activeTab = 'new_awb' }) => {
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

	const payload = {
		new_awb: {
			assignedStakeholder : 'ground_ops',
			status              : 'pending',
			task                : ['upload_mawb_freight_certificate'],
		},
		approval_pending: {
			assignedStakeholder : 'ground_ops',
			status              : 'pending',
			task                : ['approve_draft_airway_bill', 'amend_draft_airway_bill'],
			documentType        : 'draft_airway_bill',
			isDocDataRequired   : true,
		},
		approved_awb: {
			assignedStakeholder : 'ground_ops',
			status              : 'completed',
			task                : ['upload_mawb_freight_certificate'],
			documentType        : 'draft_airway_bill',
			documentState       : 'document_accepted',
			isDocDataRequired   : true,
		},
	};

	const listAPi = async ({ filter = {} }) => {
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
					pageIndex: page,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		debounceQuery(searchValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		setPage(1);
	}, [activeTab]);

	useEffect(() => {
		listAPi({});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query]);

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
