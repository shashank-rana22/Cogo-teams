import { Tooltip, Button, Toast } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick, IcMError } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from '../styles.module.css';

const ICON_MAPPING = {
	pending  : <IcMError width={16} height={16} />,
	verified : <IcCFtick width={16} height={16} />,
	rejected : <IcCFcrossInCircle width={16} height={16} />,
};

const renderToolTipContent = (unique_services) => (
	<div>
		{(unique_services || []).map((item, index) => {
			if (index === 0) {
				return null;
			}
			return <div>{startCase(item)}</div>;
		})}
	</div>
);

const renderUniqueServices = ({ services, type }) => {
	if (isEmpty(services)) return null;

	const unique_services = [];

	(services || []).forEach((item) => {
		if (type === 'category') {
			if (!unique_services.includes(item?.category)) {
				unique_services.push(item?.category);
			}
		} else if (!unique_services.includes(item?.sub_category)) {
			unique_services.push(item?.sub_category);
		}
	});

	const length = unique_services?.length;

	return (
		<div>
			{startCase(unique_services?.[0])}
			<Tooltip
				content={renderToolTipContent(unique_services)}
				placement="left"
			>
				{length - 1 > 0 ? (
					<div className={styles.underline}>
						+
						{length - 1}
						{' '}
						more
					</div>
				) : null}
			</Tooltip>
		</div>
	);
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

	const formatDate = (date) => format(date, 'dd MMM yyyy');

	const columns = [
		{
			Header   : 'VENDOR ID',
			id       : 'a',
			accessor : ({ serial_id = '' }) => (
				<section className={styles.bold}>
					#
					{serial_id}
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
				<section className={styles.bold}>
					{startCase(business_name)}
				</section>
			),
		},
		{
			Header   : 'PAN/GST',
			id       : 'd',
			accessor : ({ registration_number = '' }) => (
				<section className={styles.bold}>
					{registration_number}
				</section>
			),
		},
		{
			Header   : 'CATEGORY',
			id       : 'e',
			accessor : ({ services = [] }) => (
				<section className={styles.bold}>
					{renderUniqueServices({ services, type: 'category' })}
				</section>
			),
		},
		{
			Header : 'SUB-CATEGORY',
			id     : 'f',

			accessor: ({ services = [] }) => (
				<section className={styles.bold}>
					{renderUniqueServices({ services, type: 'sub_category' })}
				</section>
			),
		},
		{
			Header : 'CREATED AT',
			id     : 'g',

			accessor: ({ created_at = '' }) => (
				<section className={styles.bold}>
					{formatDate(created_at)}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'jh',
			accessor : () => (
				<section className={styles.bold}>
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
		params,
		setParams,
		columns,
		showFilter,
		setShowFilter,
	};
};

export default useVendorList;
