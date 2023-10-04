import { Collapse } from '@cogoport/components';
import React, { useState, useMemo } from 'react';

import getListColumnMapping from '../../get-list-column-mapping';
import ListCard from '../ListCard';
import ListHeader from '../ListHeader';
import ObjectiveData from '../ObjectiveData';

import styles from './styles.module.css';

function ObjectiveTable({ objectiveList = [] }) {
	const [activeId, setActiveId] = useState(null);

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	const objective_list = useMemo(() => (objectiveList || []).map((item) => ({
		key      : item?.id,
		title    : <ListCard listItem={item} LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />,
		children : <ObjectiveData activeObjectiveId={item?.id} />,
	})), [objectiveList, LIST_COLUMN_MAPPING]);

	return (
		<div className={styles.container}>
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />
			<Collapse
				type="form"
				panels={objective_list}
				activeKey={activeId}
				setActive={setActiveId}
			/>
		</div>
	);
}
export default ObjectiveTable;
