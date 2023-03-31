import { Toast, Button } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import styles from '../FinanceDashBoard/styles.module.css';

const useGetBfList = () => {
	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url    : '/purchase/bills/list',
			method : 'get',
		},
		{ manual: false },
	);

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: {
					organizationId: vendor_id,
				},
			});
		} catch (e) {
			Toast.error(getApiErrorString(e?.data));
		}
	}, [trigger, vendor_id]);

	useEffect(() => { fetchList(); }, [fetchList]);

	const getFinanceList = () => {
		fetchList();
	};

	const columns = [
		{
			Header   : <div className={styles.table_header}>INVOICE ID</div>,
			id       : 'a',
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
			id       : 'b',
			accessor : ({ category = '' }) => (
				<section>
					{startCase(category)}
				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>PAYMENT</div>,
			id       : 'c',
			accessor : ({ ledgerTotal = '' }) => (
				<section>
					{ledgerTotal}

				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>OPEN INVOICES</div>,
			id       : 'd',
			accessor : () => (
				<section>
					{' '}
					12(INR 300,000,00)

				</section>
			),
		},
		{
			Header   : <div className={styles.table_header}>CREATED AT</div>,
			id       : 'g',
			accessor : ({ createdDate = '' }) => (
				<section>
					{' '}
					{formatDate({
						date       : createdDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'jh',
			accessor : () => (
				<section>
					{' '}
					<Button
						size="md"
						themeType="secondary"
					>
						{' '}
						VIEW MORE
						{' '}

					</Button>
					{' '}
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
