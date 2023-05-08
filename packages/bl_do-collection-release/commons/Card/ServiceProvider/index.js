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
	console.log('itemn', item);
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
	const doc_number =		(['knockoff_pending', 'collection_pending', 'under_collection'].includes(
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
					<div className={styles.details}>
						{item?.freight_service?.service_provider?.business_name}
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>Service Provider Contact</div>
					<div className={styles.details}>
						<Tooltip
							animation="shift-away"
							interactive
							content={(<div>service provider contacts</div>
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
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>
						BL Details
					</div>
					<div className={styles.details}>
						<Tooltip
							animation="shift-away"
							interactive
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
	return (

		<div className={cl`${styles.container} ${styles.service_provider}`}>
			<div className={cl`${styles.container} ${styles.col} ${styles.sp_customer_details}`}>
				<div className={cl`${styles.container} ${styles.row}`}>
					<div className={cl`${styles.container} ${styles.half_width}`}>
						<div className={cl`${styles.text} ${styles.thin}`}>Service Provider</div>

						{/* <Tooltip
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
						</Tooltip> */}
					</div>

					<div className={cl`${styles.container}  ${styles.half_width}`}>
						<div className={cl`${styles.text}  ${styles.thin}`}>Customer</div>

						<Tooltip
							animation="shift-away"
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
						</Tooltip>
					</div>
				</div>

				<div className={cl`${styles.container}`}>
					<div className={cl`${styles.text}  ${styles.thin}`}>Service Provider Contact</div>

					<Popover
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
					</Popover>
				</div>
			</div>

			<div className={cl`${styles.container} ${styles.col} ${styles.half_width}`}>
				<div className={cl`${styles.container}`}>
					<div className={cl`${styles.text} ${styles.thin}`}>
						{docTitle}
						{' '}
						Details
					</div>
					{docsLength > 0 ? (
						<Popover
							animation="shift-away"
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
					) : null}
				</div>

				<div className={cl`${styles.container} ${styles.row}`}>
					<ExtraDetails activeTab={activeTab} item={item} />
				</div>
			</div>
		</div>
	);
}
