import { IcMDislike, IcMLike } from '@cogoport/icons-react';
import { React, useState, useRef } from 'react';

import QuestionsCollapse from '../QuestionCollapse';

import styles from './styles.module.css';

function Questions({ questions }) {
	const [open, setOPen] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	// const contentRef = useRef();
	// if (contentRef.current) console.log(contentRef.current.scrollHeight);
	const toggle = () => {
		setOPen(!open);
	};
	console.log('question', questions);
	return (

		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle}>
				<QuestionsCollapse collapse={open} questions={questions} />
			</div>
			{open && (
				<>
					<div className={styles.heading_container}>
						Incoterms, widely-used terms of sale, are a set of 11 internationally recognized rules
						which define the responsibilities of sellers and buyers. Incoterms specify who is responsible
						for paying for and managing the shipment, insurance, documentation, customs clearance, and
						other logistical activities.
					</div>
					<div>
						<span className={styles.sidetext}>1112 people found it useful.</span>
						{'    '}
						<span className={styles.sidetext}>Last updated on: 12/11/23</span>
					</div>
					<div className={styles.flex_items}>
						<span className={styles.subtitle}>Did you find this information helpful?</span>
						<div
							role="presentation"
							className={styles.like_container}
							onClick={() => setIsLiked(true)}
						>
							<IcMLike fill={isLiked ? '#9BEFA8' : '#000000'} />

						</div>

						<div
							role="presentation"
							className={styles.dislike_container}
							onClick={() => setIsLiked(false)}
						>
							<IcMDislike fill={isLiked ? '#000000' : '#ee3425'} />

						</div>
					</div>
					<div>
						<span className={styles.relatedquestion}>Related Questions</span>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							When should I use EXW?
						</div>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							What are the documents I need to procure for Incoterms?
						</div>

					</div>
				</>

			)}

		</div>
	);
}

export default Questions;
