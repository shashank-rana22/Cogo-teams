import Spinner from '../../commons/Spinner';

import Eligible from './Eligible';
import NotEligible from './NotEligible';
import styles from './styles.module.css';
import useCheckEligibility from './useCheckEligibility';

const ELIGIBILITY_SCREEN_MAPPING = {
	is_invalid_user: {
		heading     : 'Not eligible to attempt this Test',
		sub_heading : `This test is not meant for you. 
        Please go back to your Dashboard and try to attempt tests relevant to your role.`,
	},
	is_inactive: {
		heading     : 'This test is Not Active Yet',
		sub_heading : 'It will show up on your Dashboard as soon as it is Active. You may Attempt the test then.',
	},
	no_attempts_left: {
		heading     : 'No attempts remaining',
		sub_heading : 'You have exhausted all attempts to clear this test. You cannot appear for it anymore.',
	},

};

function TakeTest() {
	const {
		loading,
		data,
		currentQuestionId,
	} = useCheckEligibility();

	const { is_valid_user, is_active, attempts_left } = data || {};

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					borderWidth="6px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
				/>
			</div>
		);
	}

	if (!is_valid_user) {
		return <NotEligible {...ELIGIBILITY_SCREEN_MAPPING.is_invalid_user} />;
	}

	if (!is_active) {
		return <NotEligible {...ELIGIBILITY_SCREEN_MAPPING.is_inactive} />;
	}

	if (!attempts_left) {
		return <NotEligible {...ELIGIBILITY_SCREEN_MAPPING.no_attempts_left} />;
	}

	return <Eligible currentQuestionId={currentQuestionId} />;
}

export default TakeTest;
