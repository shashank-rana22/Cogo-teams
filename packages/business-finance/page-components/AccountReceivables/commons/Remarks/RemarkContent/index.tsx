import { getByKey, isEmpty } from '@cogoport/utils';
import React from 'react';

import { Object } from '../../Interfaces';

import styles from './styles.module.css';

function RemarkContent({ itemData }: Object) {
	return (
		<div className={styles.container}>
			{!isEmpty(getByKey(itemData, 'translationRemark')) && (
				<>
					<div className={styles.heading}>Remarks</div>
					<div className={styles.hr} />
					<div className={styles.remarks_container}>
						{getByKey(itemData, 'translationRemark') as string}
					</div>
				</>
			)}
			{isEmpty(getByKey(itemData, 'translationRemark') as string) && (
				<div className={styles.empty_container}>NO REMARKS FOUND</div>
			)}
		</div>
	);
}

export default RemarkContent;
