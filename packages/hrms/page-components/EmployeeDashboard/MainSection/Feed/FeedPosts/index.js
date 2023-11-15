import React from 'react';

import PostContainer from './PostContainer';

function FeedPosts({ data = {}, feedRefetch }) {
	const { list, bypass } = data || {};

	return (
		<>
			{(list || []).map((val) => (
				<PostContainer key={val} item={val} bypass={bypass} feedRefetch={feedRefetch} />
			))}
		</>
	);
}

export default FeedPosts;
