import { Chips } from '@cogoport/components';
import React, { useState } from 'react';

import useListFaqTag from '../../hooks/useListFaqTag';
import TopicList from '../TopicList';

import styles from './styles.module.css';

function PopularTags({ tabTitle = '', searchState = '' }) {
	const [tags, setTags] = useState([]);

	const { options } = useListFaqTag();

	return (
		<div style={{ marginBottom: 10 }}>
			<h4 style={{ margin: '12px 0' }}>
				Popular tags in this section
			</h4>

			<div className={styles.tag}>
				<Chips
					size="sm"
					items={options}
					enableMultiSelect
					selectedItems={tags}
					onItemChange={setTags}
				/>
			</div>

			<TopicList tabTitle={tabTitle} searchState={searchState} tagId={tags} />
		</div>
	);
}

export default PopularTags;
