import { Select, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../../AccountPayables/Outstanding/commons/EmptyStateDocs';
import CustomTable from '../../../../../../Settlement/page-components/History/CustomTable';
import { ACCOUNT_TYPE } from '../../../../../constants';
import useGetSettlementTable from '../../../../../hooks/useGetSettlementTable';

import styles from './styles.module.css';

function SettlementTable({ organizationId = '', entityCode = '' }) {
	const {
		data = {}, loading = false, filters = { accountType: '', query: '' },
		setFilters = () => { }, apiData = {}, refetch = () => { },
	} = useGetSettlementTable(organizationId, entityCode);

	const onPageChange = (val) => {
		setFilters((p) => ({ ...p, page: val }));
	};

	const onChange = (val, name) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};

	return (
		<div>
			<div className={styles.filter_wrap}>
				<Select
					placeholder="Select Status"
					value={filters?.accountType}
					onChange={(val) => onChange(val, 'accountType')}
					options={ACCOUNT_TYPE}
					style={{ width: 200, marginRight: '16px' }}
				/>
				<Input
					className="primary md"
					placeholder="Search by Document Number"
					value={filters?.query}
					onChange={(val) => onChange(val, 'query')}
					prefix={<IcMSearchdark />}
					style={{ width: 300 }}
				/>
			</div>

			<CustomTable
				apiData={apiData}
				filters={filters}
				setFilters={setFilters}
				loading={loading}
				onPageChange={onPageChange}
				refetch={refetch}
				showFooter={false}
			/>
			{(!loading && isEmpty(data?.list)) ? <EmptyStateDocs /> : null}

		</div>
	);
}

export default SettlementTable;
