import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

import AddressCard from '../page-components/AddressCard';
import styles from '../page-components/Business/styles.module.css';
import ToolTipContent from '../page-components/ToolTipContent';

const useGetListBusinessEntities = () => {
	const [filters, setFiters] = useState({});
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_business_entities',
		method : 'GET',
	}, { manual: true });

	const getListBusinessEntities = useCallback(async () => {
		try {
			const { page = 1 } = filters;
			await trigger({
				params: {
					filters: {
						...filters,
					},
					page,
					page_limit: 10,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger, filters]);

	const columns = [
		{
			Header   : 'Indentity Type',
			accessor : (item) => upperCase(item.identity_type),
		}, {
			Header   : 'Identity number',
			accessor : 'identity_number',
		},
		{
			Header   : 'Registration',
			accessor : 'registration_number',
		},
		{
			Header   : 'Iec Numbers',
			accessor : ({ iec_numbers = [] }) => {
				<section>
					<ToolTipContent content={iec_numbers} />
				</section>;
			},
		},
		{
			Header   : 'Tax Numbers',
			accessor : ({ tax_numbers = [] }) => (
				<section>
					<ToolTipContent content={tax_numbers} />
				</section>
			),
		},
		{
			Header   : 'Business Name',
			accessor : ({ business_name = '' }) => (
				<section>
					<Tooltip content={business_name}>
						{/* {business_name.slice(0, 10)} */}
						..
					</Tooltip>
				</section>
			),

		}, {
			Header   : 'Country',
			accessor : 'country_code',
		}, {
			Header   : 'Status',
			accessor : ({ status }) => <Pill color={status === 'active' ? 'green' : 'red'}>{upperCase(status)}</Pill>,
		}, {
			Header   : 'Establishment',
			accessor : 'establishment_year',
		}, {
			Header   : 'Addresses',
			accessor : ({ addresses = [] }) => {
				const renderTooltip = addresses.map((item) => (
					<div
						key={item?.address}
					>
						<AddressCard addresses={item} />
					</div>
				));

				return (

					<div className={styles.address_column}>

						<Tooltip content={renderTooltip} placement="top">
							<div>
								<AddressCard addresses={addresses[GLOBAL_CONSTANTS.zeroth_index]} />
							</div>
						</Tooltip>

					</div>

				);
			},
		},
		{
			Header   : 'Created at',
			accessor : (item) => formatDate({
				date       : item?.created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),
		}];
	useEffect(() => {
		getListBusinessEntities();
	}, [getListBusinessEntities]);

	return {
		filters,
		setFiters,
		loading,
		data,
		refetch    : getListBusinessEntities,
		totalCount : data?.total_count,
		columns,
	};
};
export default useGetListBusinessEntities;
