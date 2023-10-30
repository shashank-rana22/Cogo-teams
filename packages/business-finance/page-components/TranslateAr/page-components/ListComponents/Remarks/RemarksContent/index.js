import { getByKey, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RemarkContent({ itemData }) {
	return (
		<div className={styles.container}>
			{!isEmpty(getByKey(itemData, 'translationRemark')) && (
				<>
					<div className={styles.heading}>Remarks</div>
					<div className={styles.hr} />
					<div className={styles.remarks_container}>
						{getByKey(itemData, 'translationRemark')}
					</div>
				</>
			)}
			{isEmpty(getByKey(itemData, 'translationRemark')) && (
				<div className={styles.empty_container}>NO REMARKS FOUND</div>
			)}
		</div>
	);
}

export default RemarkContent;
