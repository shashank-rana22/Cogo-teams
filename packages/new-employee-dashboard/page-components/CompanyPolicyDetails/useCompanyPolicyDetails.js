import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';

const INITIAL_PAGE = 1;

const onClickViewDocument = (document_url) => {
	window.open(
		document_url,
		'_blank',
		'noreferrer',
	);
};

const useCompanyPolicyDetails = () => {
	const [showModal, setShowModal] = useState(false);
	const [page, setPage] = useState(INITIAL_PAGE);

	const [{ loading = false }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_company_document',
	}, { manual: true });

	const [{ data, loading: listLoading = false }, listTrigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_company_documents',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							category : 'company_policy',
							status   : 'active',
							page,
						},
					},
				});
			} catch (error) {
				if (error?.response) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[listTrigger, page],
	);

	useEffect(() => {
		fetch();
	}, [fetch]);

	const onClickDeleteButton = async (id) => {
		try {
			await trigger({
				data: {
					id,
					status: 'inactive',
				},
			});

			fetch();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	};

	const columns = getColumns({ onClickViewDocument, setShowModal, onClickDeleteButton, loading });

	return {
		columns,
		list        : data?.list,
		showModal,
		setShowModal,
		refetchList : fetch,
		listLoading,
		page,
		data,
		setPage,
	};
};

export default useCompanyPolicyDetails;
