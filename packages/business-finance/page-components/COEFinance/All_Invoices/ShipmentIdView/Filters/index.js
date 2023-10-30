import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../commons/Filters';
import SegmentedControl from '../../../../commons/SegmentedControl';
import { APPROVAL as ApprovalOption } from '../../../constants/shipmentListFilters';

import controls from './controls';
import styles from './styles.module.css';

function Filters({
	hookSetters,
	filters,
	pendingApproval,
	setPendingApproval,
	serialId,
	setSerialId,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.segmented}>
				<SegmentedControl
					options={ApprovalOption}
					activeTab={pendingApproval}
					setActiveTab={setPendingApproval}
					background="#FFFAEB"
					color="#ED3726"
				/>

			</div>
			<div className={styles.search_filter}>
				<Filter
					controls={controls}
					filters={filters}
					setFilters={hookSetters.setFilters}
				/>
				<div className={styles.search}>
					<Input
						name="serialId"
						size="sm"
						value={serialId}
						onChange={(e) => setSerialId(e)}
						placeholder="Search by Shipment ID"
						suffix={<IcMSearchlight height={17} width={17} style={{ margin: '0 8px' }} />}
					/>
				</div>
			</div>
		</div>
	);
}

export default Filters;
