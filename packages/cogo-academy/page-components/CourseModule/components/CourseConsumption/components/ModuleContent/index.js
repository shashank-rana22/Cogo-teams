import { Button } from '@cogoport/components';
import { IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../CreateCourse/commons/EmptyState';

import styles from './styles.module.css';

function ModuleContent({ data = {} }) {
	const { content_type, chapter_content } = data;

	if (isEmpty(data)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.btn_container}>

					<Button size="md" themeType="tertiary" className={styles.btn}>
						<IcMArrowLeft width={14} height={14} className={styles.arrow_left} />
						Previous
					</Button>

					<Button
						size="md"
						themeType="tertiary"
						className={styles.btn}
					>
						Next
						<IcMArrowRight width={14} height={14} className={styles.arrow_right} />
					</Button>
				</div>
			</div>

			{content_type === 'text' ? <div dangerouslySetInnerHTML={{ __html: chapter_content }} />
				: (
					<iframe
						style={{ width: '90%', marginTop: '20px', border: '0' }}
						height="400"
						src={
                    content_type === 'video' ? chapter_content.replace('/watch?v=', '/embed/') : chapter_content
                }
						title="video player"
						allowFullScreen
					/>
				)}

			<div className={styles.description} />
			<div className={styles.additional_resources} />

		</div>
	);
}

export default ModuleContent;
