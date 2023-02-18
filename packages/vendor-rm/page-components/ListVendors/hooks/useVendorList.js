import { Button, Toast } from '@cogoport/components';
import { IcCFtick, IcMError } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../styles.module.css';

const ICON_MAPPING = {
	pending_from_user : <IcMError />,
	verified          : <IcCFtick />,
};
const useVendorList = () => {
	const [params, setParams] = useState({
		filters: {
			status: 'active',
		},
		page                     : 1,
		pagination_data_required : true,
	});
	const [showFilter, setShowFilter] = useState(false);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_vendors',
	}, { manual: true });

	const GetVendorList = async () => {
		try {
			await trigger({
				params,
			});
		} catch (e) {
			// Toast.error(e.data);
		}
	};

	useEffect(() => {
		GetVendorList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);
	

	const columns = [
		{
			Header   : 'VENDOR ID',
			id       : 'a',
			accessor : ({ id = '' }) => (
				<section>
					#646464
				</section>
			),
		},
		{
			Header   : 'KYC STATUS',
			id       : 'b',
			accessor : ({ kyc_status = '' }) => (
				<section className={styles[kyc_status]}>
					{ICON_MAPPING[kyc_status]}
					{startCase(kyc_status)}
				</section>
			),
		},
		{
			Header   : 'NAME',
			id       : 'c',
			accessor : ({ business_name = '' }) => (
				<section>
					{business_name}
				</section>
			),
		},
		{
			Header   : 'PAN/GST',
			id       : 'd',
			accessor : ({ registration_number = '' }) => (
				<section>
					{registration_number}
				</section>
			),
		},
		{
			Header   : 'CATEGORY',
			id       : 'e',
			accessor : ({ services = [] }) => (
				<section>
					{services[0]?.category}
				</section>
			),
		},
		{
			Header : 'SUB-CATEGORY',
			id     : 'f',

			accessor: ({ services = [] }) => (
				<section>
					{services[0]?.sub_category}
				</section>
			),
		},
		{
			Header : 'CREATED AT',
			id     : 'g',

			accessor: ({ created_at = '' }) => (
				<section>
					{created_at}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'jh',
			accessor : () => (
				<section>
					<Button size="md" themeType="secondary" onClick={() => console.log('poiuytrewq')}>

						VIEW MORE
					</Button>
				</section>
			),
		},
	];

	return {
		loading,
		data,
		GetVendorList,
		params,
		setParams,
		columns,
		showFilter,
		setShowFilter,
	};
};

export default useVendorList;
