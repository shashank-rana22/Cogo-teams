import { Button, Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from '../FinanceDashBoard/styles.module.css';

const useGetBfList = ({ organizationId }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url    : '/purchase/bills/list',
			method : 'get',
		},
		{ manual: false },
	);

	const fetchList = () => {
		try {
			trigger({
				params: {
					organizationId,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchList(); }, []);

	const getFinanceList = () => {
		fetchList();
	};

	const formatDate = (date) => format(date, 'dd MMM yyyy');

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
					{formatDate(createdDate)}
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
						onClick={() => console.log('poiuytrewq')}
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
