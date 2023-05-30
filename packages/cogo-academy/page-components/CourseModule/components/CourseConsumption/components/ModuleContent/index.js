import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateCourse/commons/EmptyState';

import styles from './styles.module.css';

function ModuleContent({ data = {} }) {
	const { content_type, chapter_content } = data;

	if (isEmpty(data)) {
		<EmptyState />;
	}

	return (
		<div className={styles.container}>

			{content_type === 'text' ? <div dangerouslySetInnerHTML={{ __html: chapter_content }} />
				: (
					<iframe
						style={{ width: '90%', marginTop: '20px' }}
						height="400"
						src={
                    content_type === 'video' ? chapter_content.replace('/watch?v=', '/embed/') : chapter_content
                }
						title="YouTube video player"
						allow="accelerometer; clipboard-write;
                        encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen="true"
					/>
				)}

		</div>
	);
}

export default ModuleContent;
