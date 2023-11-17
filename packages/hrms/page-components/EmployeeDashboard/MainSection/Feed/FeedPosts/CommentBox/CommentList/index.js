/* eslint-disable import/no-cycle */
import React from 'react';

import Comment from '../Comment';

function CommentList({ comments = [] }) {
	return (
		<div>
			{comments.map((val) => (
				<div key={val.id}>
					<Comment {...val} />
				</div>
			))}
		</div>
	);
}

export default CommentList;
