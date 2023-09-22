import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useCallback, useContext } from 'react';

import IGMDeskContext from '../context/IGMDeskContext';
import getPayload from '../helpers/getListIGMDeskShipmentsPayload';

import useCallApi from './useCallApi';

const DEFAULT_TOTAL_COUNT_FOR_PAGINATION = 0;
const DEFAULT_TOTAL_PAGE_FOR_PAGINATION = 0;
const PAGE_ONE = 1;

const EMPTY_DATA = { list: [], total: 0, total_page: 0 };

export default function useListIGMDeskShipments() {
	const { partner_id, authParams = {}, selected_agent_id = '' } = useSelector(({ general, profile }) => ({
		partner_id        : general?.query?.partner_id,
		authParams        : profile.authParams || ' ',
		selected_agent_id : profile.selected_agent_id || '',
	}));

	const [, scope, view_type] = (authParams || '').split(':');

	const { filters, setFilters, tabState } = useContext(IGMDeskContext) || {};
	const [data, setData] = useState(EMPTY_DATA);

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_igm_desk_shipments',
		method : 'GET',
	}, { manual: true });

	const listShipments = useCallback(async () => {
		try {
			const res = await trigger({
				params: getPayload({ filters, tabState, partner_id }),
			});

			if (isEmpty(res.data?.list) && filters?.page > PAGE_ONE) {
				setFilters({ ...filters, page: 1 });
			} else {
				setData(res.data || {});
			}

			localStorage.setItem('igm_desk_stored_values', JSON.stringify({
				scopeFilters: { scope, view_type, selected_agent_id },
			}));
		} catch (err) {
			toastApiError(err);
			setData(EMPTY_DATA);
		}
	}, [selected_agent_id, trigger, filters, tabState, partner_id, setFilters, scope, view_type]);

	useCallApi({ listShipments, filters, tabState });

	return {
		data: {
			list       : data.list || [],
			total      : data.total_count || DEFAULT_TOTAL_COUNT_FOR_PAGINATION,
			total_page : data.total || DEFAULT_TOTAL_PAGE_FOR_PAGINATION,
		},
		loading,
		refetch: listShipments,
	};
}
