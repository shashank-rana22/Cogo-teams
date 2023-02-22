import { Pill } from '@cogoport/components';
import { React, useState, useRef } from 'react';

import QuestionsCollapse from '../QuestionCollapse';

import styles from './styles.module.css';

function Questions() {
	const [open, setOPen] = useState(false);
	// const contentRef = useRef();
	// if (contentRef.current) console.log(contentRef.current.scrollHeight);
	const toggle = () => {
		setOPen(!open);
	};

	return (

		<div className={styles.contentshow}>
			{/* // className={styles.contentparent}
			// ref={contentRef}
			// style={open ? { height: `${contentRef.current.scrollHeight} px` } : { height: '0px' }} */}

			<div onClick={toggle}>
				<QuestionsCollapse collapse={open} />

			</div>
			{open && (
				<>
					<div className={styles.heading_container}>
						Incoterms, widely-used terms of sale, are a set of 11 internationally recognized rules which define the responsibilities of
						sellers and buyers. Incoterms specify who is responsible for paying for and managing the shipment, insurance,
						documentation, customs clearance, and other logistical activities.
					</div>
					<div>
						<span className={styles.sidetext}>1112 people found it useful.</span>
						{'    '}
						<span className={styles.sidetext}>Last updated on: 12/11/23</span>
					</div>
					<div className={styles.subtitle}>
						<span>Did you find this information helpful?</span>
						<Pill size="lg" color="white" className={styles.pills}>Yes</Pill>
						<Pill size="lg" color="white" className={styles.pills}>No</Pill>
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
