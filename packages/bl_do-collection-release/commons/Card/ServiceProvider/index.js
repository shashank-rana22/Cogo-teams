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
			<div>
				Service provider
			</div>
			<div>contac</div>
			<div className={styles.border_right} />
		</div>
	);
}
