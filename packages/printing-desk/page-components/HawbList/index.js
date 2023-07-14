import { Loader } from '@cogoport/components';
import React, { useEffect } from 'react';

import { hawbFields } from '../../configurations/hawb-fields';
import CONSTANTS from '../../constants/constants';
import useGetHawbList from '../../hooks/useGetHawbList';
import commonFunctions from '../../utils/commonFunctions';

import HawbListItem from './HawbListItem';
import styles from './styles.module.css';

const EDIT_HAWB = {
	key   : 'edit',
	label : '',
	span  : 1,
	func  : 'handleEdit',
};

function HawbList({ data = {}, setViewDoc = () => {}, setItem = () => {}, setEdit = () => {} }) {
	const { fields } = hawbFields;
	const { shipmentId, documentData = {} } = data || {};

	const { data:hawbData = {}, loading, getHawbList:listAPI } = useGetHawbList(shipmentId);

	const finalHawbFields = [...fields, documentData?.handedOverForTd && EDIT_HAWB];

	useEffect(() => {
		listAPI();
	}, [listAPI]);

	return (
		<div className={styles.hawb_container}>
			{loading ? <Loader /> : (
				<div className={styles.hawb_list}>
					<header className={styles.header}>
						{finalHawbFields.map((field) => (
							<div
								className={styles.col}
								style={{ '--span': field.span || CONSTANTS.DEFAULT_SPAN }}
								key={field.key}
							>
								{ field.label }
							</div>
						))}
					</header>
					{(hawbData?.data?.shipmentPendingTasks || []).map((item) => (
						<HawbListItem
							key={item.id}
							item={item}
							fields={finalHawbFields}
							loading={loading}
							functions={commonFunctions({ setViewDoc, setItem, setEdit })}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default HawbList;
