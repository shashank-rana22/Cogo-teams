import { cl, Popover, Tooltip } from '@cogoport/components';
import { IcMUserAllocations } from '@cogoport/icons-react';

import BLPopver from './BLPopover';
import ExtraDetails from './ExtraDetails';
import SPPopver from './SPPopover';
import styles from './styles.module.css';

const styleIcon = {
	marginLeft    : 4,
	height        : 20,
	width         : 20,
	verticalAlign : 'middle',
};

export default function ServiceProvider({ item = {}, stateProps = {} }) {
	const getDocs = (ele) => {
		let doc;
		if (
			['knockoff_pending', 'collection_pending', 'under_collection'].includes(
				stateProps.inner_tab,
			)
			&& ele?.trade_type === 'import'
		) {
			doc = ele?.import_bl_details;
		} else {
			doc =				ele?.trade_type === 'export'
				? ele?.export_bl_details
				: ele?.do_documents;
		}
		return doc;
	};

	const list_of_docs = getDocs(item);
	const docsLength = list_of_docs?.length;
	const remainLength = docsLength > 1 ? docsLength - 1 : 0;
	const doc_number = (['knockoff_pending', 'collection_pending', 'under_collection'].includes(
		stateProps.inner_tab,
	)
			&& item?.trade_type === 'import')
		|| item?.trade_type === 'export'
		? list_of_docs?.[0]?.bl_number
		: list_of_docs?.[0]?.do_number;

	const docTitle =		item?.trade_type === 'export'
		|| (item?.trade_type === 'import'
			&& ['knockoff_pending', 'collection_pending', 'under_collection'].includes(
				stateProps.inner_tab,
			))
		? 'BL'
		: 'DO';

	return (
		<div className={styles.container}>
			<div className={styles.col}>
				<div className={cl`${styles.left}`}>
					<div className={styles.grey}>
						Service Provider
					</div>
					<div>
						<Tooltip
							animation="shift-away"
							interactive
							content={(
								<div>
									{' '}
									{item?.freight_service?.service_provider?.business_name}
								</div>
							)}
						>
							<div className={styles.details}>
								{item?.freight_service?.service_provider?.business_name}
							</div>
						</Tooltip>

					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>Service Provider Contact</div>
					<div className={styles.details}>
						<Tooltip
							animation="shift-away"
							interactive
							content={(
								<SPPopver
									spDetails={item?.pocs}
								/>
							)}
						>
							<div className={styles.tooltip_container}>Click Here To View</div>
						</Tooltip>

					</div>
				</div>
			</div>
			<div className={styles.col}>
				<div className={styles.left}>
					<div className={styles.grey}>
						Customer
					</div>
					<div className={styles.details}>
						{item?.customer?.business_name}
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>
						{stateProps.activeTab.toUpperCase()}
						{' '}
						Details
					</div>
					<div className={cl`${styles.details} ${styles.service_provider_details}`}>
						<Tooltip
							placement="top"
							caret={false}
							content={(<BLPopver blDetails={item?.bill_of_ladings} bl_do={stateProps.activeTab} />
							)}
						>
							<div className={styles.tooltip_container}>Details</div>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
}
