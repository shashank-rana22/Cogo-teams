import SingleQuestion from '../SingleQuestion';

import Paragraph from './Paragraph';
import styles from './styles.module.css';

function CaseStudy({ question }) {
	const { content } = question;

	return (
		<div className={styles.container}>
			<Paragraph content={content} />

			<SingleQuestion question={question} />
		</div>
	);
}

export default CaseStudy;
