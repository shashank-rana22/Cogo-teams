// import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getColumns from './getColumns';

const useCompanyPolicyDetails = () => {
	const [showModal, setShowModal] = useState(false);

	// const router = useRouter();

	const [{ loading = false }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_document_template',
	}, { manual: true });

	const [{ data, loading: listLoading = false }, listTrigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_document_templates',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							template_type : 'company_policy',
							status        : 'active',
						},
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[listTrigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch]);

	const onClickDeleteButton = async (id) => {
		try {
			await trigger({
				data: {
					id,
					performed_by_id   : '123',
					performed_by_type : 'agent',
					status            : 'inactive',
				},
			});

			fetch();
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onClickViewDocument = (document_url) => {
		window.open(
			document_url,
			'_blank',
			'noreferrer',
		);
	};

	const columns = getColumns({ onClickViewDocument, setShowModal, onClickDeleteButton, loading });

	return {
		columns,
		list        : data?.list,
		showModal,
		setShowModal,
		refetchList : fetch,
		listLoading,
	};
};

export default useCompanyPolicyDetails;
