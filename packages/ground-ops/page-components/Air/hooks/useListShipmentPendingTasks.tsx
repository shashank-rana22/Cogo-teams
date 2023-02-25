import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipmentPendingTasks = ({ activeTab = 'new_awb' }) => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest(
		'http://192.168.1.178:8101/air-coe/pending-tasks/list',
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
			assignedStakeholder: 'ground_ops',
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
					page,
					sort_type: 'desc',
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
