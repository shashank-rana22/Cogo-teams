import { Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../commons/StyledTable';
import { VENDER_LIST_OPTIONS } from '../Constants';
import useGetBySupplier from '../hooks/useGetBySupplier';

import styles from './styles.module.css';
import VendorsColumn from './vendorsColumn';

interface ItemProps {
	activeEntity: string,
}

function VendorsList({ activeEntity }:ItemProps) {
	const [showVendorsList, setShowVendorsList] = useState(undefined);

	const { data, loading } = useGetBySupplier({ showVendorsList, activeEntity });
	const { list = [] } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Top 10 Vendors
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content={(
							<div>
								Top 10 outstanding
								<br />
								payments of vendors
							</div>
						)}
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<Select
						name="category"
						value={showVendorsList}
						onChange={setShowVendorsList}
						options={VENDER_LIST_OPTIONS}
						size="sm"
						isClearable
						placeholder="Category"
					/>
				</div>
			</div>
			<StyledTable data={list} columns={VendorsColumn} loading={loading} />
		</div>
	);
}

export default VendorsList;
