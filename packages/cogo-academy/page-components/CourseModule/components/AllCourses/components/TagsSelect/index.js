import { Chips } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TagsSelect({ category, selected, setSelected }) {
	const topicName = [];
	const options = category?.topics;
	(options || []).forEach((item) => {
		topicName.push({
			key      : item.topic_id,
			children : item.topic_name,
			color    : 'grey',
			tooltip  : false,
			disabled : false,
			closable : true,
		});
	});
	return (
		<div className={styles.container}>
			<Chips
				enableMultiSelect
				items={topicName}
				selectedItems={selected}
				onItemChange={setSelected}
			/>
		</div>
	);
}

export default TagsSelect;
