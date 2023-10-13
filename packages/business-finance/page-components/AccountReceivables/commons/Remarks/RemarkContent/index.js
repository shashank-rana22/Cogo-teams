import { getByKey, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RemarkContent({ itemData }) {
	return (
		<div className={styles.container}>
			{!isEmpty(getByKey(itemData, 'remarks')) && (
				<>
					<div className={styles.heading}>Remarks</div>
					<div className={styles.hr} />
					<div className={styles.remarks_container}>
<<<<<<< HEAD:packages/business-finance/page-components/AccountReceivables/commons/Remarks/RemarkContent/index.js
						{getByKey(itemData, 'translationRemark')}
					</div>
				</>
			)}
			{isEmpty(getByKey(itemData, 'translationRemark')) && (
=======
						{getByKey(itemData, 'remarks') as string}
					</div>
				</>
			)}
			{isEmpty(getByKey(itemData, 'remarks') as string) && (
>>>>>>> 232ef11ced9cecabbd871a5e0d28195108cc8ddc:packages/business-finance/page-components/AccountReceivables/commons/Remarks/RemarkContent/index.tsx
				<div className={styles.empty_container}>NO REMARKS FOUND</div>
			)}
		</div>
	);
}

export default RemarkContent;
