import React from 'react';

import FeedPosts from './FeedPosts';
import Post from './Post';
import Poster from './Poster';
import styles from './styles.module.css';

function Feed({ data = {} }) {
	return (
		<div className={styles.container}>
			<Post />
			<Poster />
			<FeedPosts data={data} />
		</div>
	);
}

export default Feed;
