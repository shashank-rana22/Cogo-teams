import { cl, Popover, ToolTip } from '@cogoport/components';
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

export default function ServiceProvider({ item = {}, activeTab = '' }) {
	const getDocs = (ele) => {
		let doc;
		if (
			['knockoff_pending', 'collection_pending', 'under_collection'].includes(
				activeTab,
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
	const doc_number =		(['knockoff_pending', 'collection_pending', 'under_collection'].includes(
		activeTab,
	)
			&& item?.trade_type === 'import')
		|| item?.trade_type === 'export'
		? list_of_docs?.[0]?.bl_number
		: list_of_docs?.[0]?.do_number;

	const docTitle =		item?.trade_type === 'export'
		|| (item?.trade_type === 'import'
			&& ['knockoff_pending', 'collection_pending', 'under_collection'].includes(
				activeTab,
			))
		? 'BL'
		: 'DO';

	return (

		<div className={cl`${styles.container} ${styles.service_provider}`}>
			<div className={cl`${styles.container} ${styles.col} ${styles.sp_customer_details}`}>
				<div className={cl`${styles.container} ${styles.row}`}>
					<div className={cl`${styles.container} ${styles.half_width}`}>
						<div className={cl`${styles.text} ${styles.thin}`}>Service Provider</div>

						{/* <ToolTip
							animation="shift-away"
							theme="light-border"
							interactive
							content={(
								<div className={cl`{styles.text}`} className="bold service-provider">
									{(item?.service_provider?.business_name || '').toLowerCase()}
								</div>
							)}
						>
							<div className={cl`{styles.text}`} className="bold service-provider ellipsis-text">
								{(item?.service_provider?.business_name || '').toLowerCase()}
							</div>
						</ToolTip> */}
					</div>

					<div className={cl`${styles.container}  ${styles.half_width}`}>
						<div className={cl`${styles.text}  ${styles.thin}`}>Customer</div>

						{/* <ToolTip
							animation="shift-away"
							theme="light-border"
							interactive
							content={(
								<div className={cl`${styles.text} ${styles.bold} ${styles.service_provider}`}>
									{(item?.customer?.business_name || '').toLowerCase()}
								</div>
							)}
						>
							<div className={cl`${styles.text} ${styles.bold}
              ${styles.service_provider} ${styles.ellipsis_text}`}
							>
								{(item?.customer?.business_name || '').toLowerCase()}
							</div>
						</ToolTip> */}
					</div>
				</div>

				<div className={cl`${styles.container}`}>
					<div className={cl`${styles.text}  ${styles.thin}`}>Service Provider Contact</div>
					{/*
					<Popover
						theme="light-border"
						animation="shift-away"
						interactive
						content={(
							<SPPopver
								spDetails={item?.organization_poc}
								address={item?.organization_address}
							/>
						)}
					>
						<div className={cl`${styles.text} ${styles.bold} ${styles.link} ${styles.inline}`}>
							Click here to view
							<IcMUserAllocations style={styleIcon} />
						</div>
					</Popover> */}
				</div>
			</div>

			<div className={cl`${styles.container} ${styles.col} ${styles.half_width}`}>
				<div className={cl`${styles.container}`}>
					<div className={cl`${styles.text} ${styles.thin}`}>
						{docTitle}
						{' '}
						Details
					</div>
					{/* {docsLength > 0 ? (
						<Popover
							animation="shift-away"
							theme="light-border"
							content={<BLPopver bl_do={docTitle} blDetails={list_of_docs} />}
						>
							<div className={cl`${styles.container} ${styles.cursor} ${styles.inline}`}>
								<div className={cl`${styles.text} ${styles.document}`}>{doc_number}</div>
								{remainLength ? (
									<div className={styles.more}>
										+
										{remainLength}
										{' '}
										MORE
									</div>
								) : null}
							</div>
						</Popover>
					) : null} */}
				</div>

				<div className={cl`${styles.container} ${styles.row}`}>
					<ExtraDetails activeTab={activeTab} item={item} />
				</div>
			</div>
		</div>
	);
}
