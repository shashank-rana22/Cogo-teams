import { Chips } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React, { useState } from 'react';

import useListFaqTag from '../../../../hooks/useListFaqTag';

import styles from './styles.module.css';
import TopicList from './TopicList';

function PopularTags({ tabTitle = '', searchState = '' }) {
	const { profile } = useSelector((state) => state);

	const { ids = [] } = profile?.faq || {};

	const [tags, setTags] = useState(ids || []);

	const dispatch = useDispatch();

	const handleOnChangeItem = (item) => {
		setTags(item);

		dispatch(setProfileState({
			faq:
			{ ids: item },
		}));
	};

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
					onItemChange={(item) => handleOnChangeItem(item)}
				/>
			</div>

			<TopicList tabTitle={tabTitle} searchState={searchState} tagId={tags} />
		</div>
	);
}

export default PopularTags;
