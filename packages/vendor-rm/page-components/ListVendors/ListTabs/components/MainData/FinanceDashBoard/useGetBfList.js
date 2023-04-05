import { Toast, Button } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import styles from './styles.module.css';

const useGetBfList = () => {
	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	const { push } = useRouter();

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					organizationId: vendor_id,
				},
			});
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	}, [trigger, vendor_id]);

	useEffect(() => { fetchList(); }, [fetchList]);

	const getFinanceList = () => {
		fetchList();
	};

	const handleGoToBFDashboard = () => {
		push('/business-finance/overheads/expenses');
	};

	const columns = [
		{
			Header   : <div className={styles.table_header}>INVOICE ID</div>,
			id       : 'id',
			accessor : ({ billId = '' }) => (
				<section>
					{' '}
					#
					{billId}
				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>Category</div>,
			id       : 'category',
			accessor : ({ category = '' }) => (
				<section>
					{startCase(category)}
				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>PAYMENT</div>,
			id       : 'payment',
			accessor : ({ ledgerTotal = '', ledgerCurrency }) => (
				<section>
					{ledgerCurrency}
					{' '}
					{ledgerTotal}
				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>CREATED AT</div>,
			id       : 'created_at',
			accessor : ({ createdDate = '' }) => (
				<section>
					{format(
						createdDate,
						GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						{},
						false,
					)}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'view_more',
			accessor : () => (
				<section>
					<Button
						size="md"
						themeType="secondary"
						type="button"
						onClick={handleGoToBFDashboard}
					>
						VIEW MORE
					</Button>
				</section>
			),
		},
	];

	return {
		getFinanceList,
		data: data?.list,
		loading,
		columns,
	};
};

export default useGetBfList;
