import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import styles from './styles.module.css';

const Table = dynamic(() => import('@cogoport/components').then((module) => module.Table), { ssr: false });

function Footer({ item = {} }) {
	const [show, setShow] = useState(false);
	const columns = [
		{ Header: 'Lower Limit', accessor: (row) => `${row?.lower_limit || '-'} Days ` },
		{ Header: 'Upper Limit', accessor: (row) => `${row?.upper_limit || '-'} Days` },
		{ Header: 'Currency', accessor: (row) => row?.currency },
		{ Header: 'Price', accessor: (row) => row?.price },
	];
	const { slabs = [], updated_at = '' } = item || {};

	return (
		<div className={styles.container}>
			{show ? (
				<div className={styles.table_container}>
					<Table data={slabs} columns={columns} />
					<div className={styles.updated_at}>
						{formatDate({
							date       : updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
						})}

					</div>
				</div>
			) : null}

			<div className={styles.actions_container}>
				{show ? (
					<Button onClick={() => setShow(false)} size="xs" themeType="link">
						{' '}
						View Less
						{' '}
						<IcMArrowRotateUp />
					</Button>
				) : (
					<Button onClick={() => setShow(true)} size="xs" themeType="link">
						{' '}
						View More
						{' '}
						<IcMArrowRotateDown />
					</Button>
				)}
			</div>
		</div>
	);
}

export default Footer;
