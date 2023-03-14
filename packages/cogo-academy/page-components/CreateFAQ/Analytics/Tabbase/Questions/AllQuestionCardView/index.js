import { Pill,Button } from '@cogoport/components';
import QuestionsList from '../QuestionList';
import {useState} from 'react';
import styles from './styles.module.css';
import ViewCards from './ViewCards';
import ViewCardsList from './ViewCardsList';
import { IcMArrowDown,IcMArrowUp } from '@cogoport/icons-react';
import { IcMArrowDoubleRight } from '@cogoport/icons-react';

function AllQuestionCardView(props) {
	const [showQuestions,setShowQuestions]=useState(false)
	const { data } = props;
	const { total_count } = data || 0;
	return (
		<div style={{ marginTop: '1rem' ,overflow: 'hidden'}}>
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
						No of Questions:
						{' '}
						{total_count}

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
					<div><IcMArrowDoubleRight style={{marginTop:'60px',marginLeft:'5px',height:'40px',width:'30px'}} className={styles.arrow}/></div>
					<ViewCards cardHeading="Topic from which Most Questions viewed" subHeading="ed" />
					<ViewCards cardHeading="User group that viewed the Most Questions " subHeading="ecd" />
					<ViewCardsList cardHeading="Top Viewed Questions" contentQuestion="What are Incoterms?" />
					<ViewCardsList cardHeading="Top Liked Questions" contentQuestion="What are Incoterms?" />
				</div>

				<div style={{marginTop:'-25px',float:'right'}}><Button size="md" themeType="tertiary" onClick={()=>setShowQuestions((pv)=>!pv)}><div style={{fontWeight:600}}>All Questions..</div>{!showQuestions?<IcMArrowDown/>:<IcMArrowUp/>}</Button></div>
			</div>
			{showQuestions?<QuestionsList {...props}/>:null}
		</div>

	);
}

export default AllQuestionCardView;
