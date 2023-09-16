import { Table, Button } from '@cogoport/components';
import { IcMArrowUp, IcMArrowDown } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import ListPagination from '../ListPagination';

import styles from './styles.module.css';
import { tabColumns } from './tableColumns';

function SheetsList({ filters = {}, setFilters = () => {}, data = {}, heading = '', loading = false }) {
	const router = useRouter();
	const paginationProps = { setFilters, filters, data };
	const [sortTypeCreatedAt, setSortingTypeCreatedAt] = useState('asc');
	const [sortTypeUpdatedAt, setSortingTypeUpdatedAt] = useState('asc');

	const onClickCreatedAt = () => {
		setSortingTypeUpdatedAt('asc');
		if (sortTypeCreatedAt === 'desc') {
			setSortingTypeCreatedAt('asc');
			setFilters((p) => ({ ...p, sort_by: 'created_at', sort_type: 'asc' }));
		} else {
			setSortingTypeCreatedAt('desc');
			setFilters({ sort_by: 'created_at', sort_type: 'desc' });
		}
	};
	const onClickUpdatedAt = () => {
		setSortingTypeCreatedAt('asc');
		if (sortTypeUpdatedAt === 'desc') {
			setSortingTypeUpdatedAt('asc');
			setFilters((p) => ({ ...p, sort_by: 'updated_at', sort_type: 'asc' }));
		} else {
			setSortingTypeUpdatedAt('desc');
			setFilters({ sort_by: 'updated_at', sort_type: 'desc' });
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>{heading}</div>
				<div className={styles.filters}>
					<Button themeType="secondary" onClick={onClickCreatedAt}>
						Created At
						{' '}
						{sortTypeCreatedAt === 'asc'
							? <IcMArrowUp /> : <IcMArrowDown />}
					</Button>
					<Button themeType="secondary" onClick={onClickUpdatedAt} className={styles.updated_btn}>
						Updated At
						{' '}
						{sortTypeUpdatedAt === 'asc'
							? <IcMArrowUp /> : <IcMArrowDown />}

					</Button>
				</div>

			</div>

			<ListPagination {...paginationProps} />

			<Table
				onRowClick={(item) => router.push(`/ihls/data-pipeline/${item?.id}`)}
				loading={loading}
				columns={tabColumns}
				data={data?.list || []}
			/>

			<ListPagination {...paginationProps} />
		</div>
	);
}

export default SheetsList;
