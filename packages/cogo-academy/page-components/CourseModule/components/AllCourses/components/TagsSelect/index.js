import { Tags } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function TagsSelect({ category }) {
	const topicName = [];
	const options = category?.topics;
	(options || []).forEach((item, index) => {
		topicName.push({
			key      : index,
			children : item.topic_name,
			color    : 'grey',
			tooltip  : false,
			disabled : false,
			closable : true,
		});
	});

	const [items, setItems] = useState(topicName);

	return (
		<div className={styles.container}>
			<Tags items={items} onItemsChange={setItems} />
		</div>
	);
}

export default TagsSelect;
