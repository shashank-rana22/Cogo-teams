import { Tags } from '@cogoport/components';
import React, { useState } from 'react';

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
		});
	});

	const [items, setItems] = useState(topicName);

	return (
		<Tags items={items} onItemsChange={setItems} />
	);
}

export default TagsSelect;
