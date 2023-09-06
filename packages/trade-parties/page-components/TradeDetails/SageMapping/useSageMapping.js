import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useGetPermission } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListSageOrganizationIdMappings from '../../../hooks/useListSageOrganizationIdMappings';
import conditions from '../../../utils/sage-conditions';

import styles from './styles.module.css';

const useSageMapping = ({ tradePartyDetails }) => {
	const [showDeactivate, setShowDeactivate] = useState(null);
	const { data, loading, trigger } = useListSageOrganizationIdMappings({ id: tradePartyDetails.serial_id });
	const { isConditionMatches } = useGetPermission();

	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		setTableData(data);
	}, [data]);
	const refetch = async () => {
		try {
			const res = await trigger();
			setTableData(res?.data);
		} catch (err) {
			console.log(err);
		}
	};
	const isAllowedToDeleteMapping = isConditionMatches(
		conditions.CAN_DEACTIVATE_SAGE_ORG_MAPPING,
	);

	const tableColumns = [
		{
			Header   : 'SAGE ID',
			accessor : (item) => (
				<div>
					<div className={styles.serial_id}>
						#
						{' '}
						{item.sage_organization_id}
					</div>
				</div>
			),
		},
		{
			Header   : 'SAGE BUSINESS NAME',
			accessor : (item) => (item.sage_details?.sage_business_name),
		},
		{
			Header   : 'STATUS',
			accessor : (item) => <Pill>{(item.status)}</Pill>,
		},
		{
			Header   : 'COMPANY TYPE',
			accessor : (item) => (startCase(item.account_type)),
		},
		{
			Header   : 'CREATED AT',
			accessor : (item) => (formatDate({
				date       : item.created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			})),
		},
		{
			Header   : ' ',
			accessor : (item) => (item.status === 'active' && isAllowedToDeleteMapping ? (
				<Button
					themeType="secondary"
					onClick={() => setShowDeactivate(item.id)}
				>
					Deactivate
				</Button>
			) : null),
		},

	];

	return {
		data: tableData,
		loading,
		tableColumns,
		showDeactivate,
		setShowDeactivate,
		refetch,
	};
};

export default useSageMapping;
