import { Button } from '@cogoport/components';
import {
	IcMRefresh, IcMFileUploader, IcMTick,
	IcMUpload, IcMBldo, IcMActivePlans, IcMShip, IcMInvoiceApprovals, IcMCrossInCircle,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../commons/EmptyState';
import useAthenaFileList from '../../hooks/useAthenaFileList';
import useAthenaFileStats from '../../hooks/useAthenaFileStats';

import FileStats from './FileStats';
import SheetsList from './SheetsList';
import styles from './styles.module.css';

const FILTER_MAPPING = {
	total                   : undefined,
	uploaded                : 'uploaded',
	processing              : 'processing',
	raw_record_created      : 'raw_record_created',
	lead_created            : 'lead_created',
	shipment_record_created : 'shipment_record_created',
	success                 : 'success',
	failure                 : 'failure',
};
const FILE_SVG_MAPPING = {
	total                   : <IcMFileUploader />,
	success                 : <IcMTick />,
	uploaded                : <IcMUpload />,
	raw_record_created      : <IcMBldo />,
	lead_created            : <IcMActivePlans />,
	shipment_record_created : <IcMShip />,
	processing              : <IcMInvoiceApprovals />,
	failure                 : <IcMCrossInCircle />,
};

function FileProcessingDashboard() {
	const [heading, setHeading] = useState('Total Files');
	const [isSelectedKey, setIsSelectedKey] = useState('total_files');

	const FILE_STATS_KEYS = Object.keys(FILTER_MAPPING);

	const { data = {}, statsLoading = false, fetchFileStats = () => {} } = useAthenaFileStats();

	const {
		listData = {}, listLoading = false, fetchFileList = () => {}, setFilters = () => {},
		filters = {},
	} = useAthenaFileList({
		defaultParams: {
			page_limit               : 10,
			pagination_data_required : true,
		},
		defaultFilters: {},
	});
	const refetch = () => {
		fetchFileList();
		fetchFileStats();
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>Source Data Files</div>
				<Button themeType="secondary" onClick={refetch}>
					<IcMRefresh style={{ marginRight: '4px' }} />
					REFRESH

				</Button>
			</div>
			<div className={styles.cards_container}>
				<div className={styles.lead_conversion_stats_container}>
					{FILE_STATS_KEYS.map((conversionKey) => (
						<FileStats
							key={conversionKey}
							conversionKey={conversionKey}
							SVG_MAPPING={FILE_SVG_MAPPING}
							stat={data[conversionKey]}
							loading={statsLoading}
							setHeading={setHeading}
							isSelectedKey={isSelectedKey}
							setIsSelectedKey={setIsSelectedKey}
							setFilters={setFilters}
						/>
					))}
				</div>
			</div>
			{isEmpty(listData?.list) && !listLoading ? (
				<EmptyState
					height={220}
					width={350}
					emptyText="No Records Found"
					flexDirection="row"
					textSize="22px"
				/>
			) : (
				<SheetsList
					heading={heading}
					loading={listLoading}
					data={listData}
					filters={filters}
					setFilters={setFilters}
				/>
			)}
		</div>
	);
}

export default FileProcessingDashboard;
