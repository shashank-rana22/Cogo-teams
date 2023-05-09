import Curriculum from './components/Curriculum';
import Specifications from './components/Specifications';
import Header from './Header';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	overview          : Curriculum,
	specifications    : Specifications,
	intended_learners : Curriculum,
	course_curriculum : Curriculum,
	course_completion : Curriculum,
	publish_course    : Curriculum,
};

function RightComponent({ activeTab }) {
	const ActiveComponent = COMPONENT_MAPPING[activeTab] || Curriculum;

	return (
		<div className={styles.conatiner}>
			<Header activeTab={activeTab} />

			<ActiveComponent />
		</div>
	);
}

export default RightComponent;
