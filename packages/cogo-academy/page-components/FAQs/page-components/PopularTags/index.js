import { Chips, Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListFaqTag from '../../hooks/useListFaqTag';
import TopicList from '../TopicList';

import styles from './styles.module.css';

function PopularTags({ tabTitle = '', searchState = '' }) {
	const [tags, setTags] = useState([]);
	const {
		refetchTag = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
		options,
	} = useListFaqTag({ tagIds: tags });

	console.log('tags123 :: ', tags);

	const onItemChange = (e) => {
		// setTags((prev) => [
		// 	...prev,
		// 	e,
		// ]);
	};

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
