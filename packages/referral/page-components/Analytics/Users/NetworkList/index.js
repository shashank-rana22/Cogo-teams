import { Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useGetListReferralMappings from '../../../../hooks/useGetListReferralMappings';
import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function NetworkList({
	showOptions,
	setShowOptions,
	showActivityModal,
	setShowActivityModal,
}) {
	// const { networkData = {}, loading = false } = useGetListReferralMappings();
	// const { list = [] } = networkData || {};

	// if (isEmpty(list) && !loading) {
	// 	return (
	// 		<div className={styles.empty_div}>
	// 			<Image src={GLOBAL_CONSTANTS.image_url.list_empty_image} width={100} height={100} />
	// 		</div>
	// 	);
	// }

	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Networks</div>
			<Table
				columns={TableColumns({
					listType: 'network',
					showOptions,
					setShowOptions,
					showActivityModal,
					setShowActivityModal,
				})}
				data={[]}
				loadingRowsCount={10}
				// loading={loading}
			/>
		</div>
	);
}
export default NetworkList;
