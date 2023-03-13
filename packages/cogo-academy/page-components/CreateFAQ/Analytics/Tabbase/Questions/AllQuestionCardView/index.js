import { Pill } from '@cogoport/components';

import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';

function AllQuestionCardView() {
	return (
		<div style={{ marginTop: '1rem' }}>
			<div className={styles.container}>
				<div style={{ justifyContent: 'space-between' }}>
					<Pill
						size="xl"
						color="#CFEAED"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						All Questions

					</Pill>

					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '45%',

						}}
					>
						No of Questions: 56

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Views: 56

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Likes: 56

					</Pill>
					<Pill
						size="lg"
						color="#F3FAFA"
						style={{
							fontWeight : '600',
							marginTop  : '-9%',
							marginLeft : '1%',

						}}
					>
						No of Dislikes: 56

					</Pill>

				</div>
				<div style={{ display: 'flex' }}>
					<ViewCards cardHeading="Topic from which Most Questions viewed" subHeading="ed" />
					<ViewCards cardHeading="User group that viewed the Most Questions " subHeading="ecd" />
					<ViewCardsList cardHeading="Top Viewed Questions" contentQuestion="What are Incoterms?" />
					<ViewCardsList cardHeading="Top Liked Questions" contentQuestion="What are Incoterms?" />
				</div>

			</div>
		</div>

	);
}

export default AllQuestionCardView;
