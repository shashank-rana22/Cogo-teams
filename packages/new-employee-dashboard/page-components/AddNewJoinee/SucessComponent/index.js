import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import AnimatedTick from '../../../common/AnimatedTick';
import useGetEmployeeDetails from '../useGetEmployeeDetails';

import styles from './styles.module.css';

function SuccessComponent({ activePage }) {
	const router = useRouter();

	const { data } = useGetEmployeeDetails({ activePage });

	const { detail } = data || {};
	const { name, employee_code } = detail || {};

	const onClickGoToDashboard = () => {
		const href = '/new-employee-dashboard';
		router.push(href, href);
	};

	return (
		<div className={styles.container}>

			<AnimatedTick />

			<div className={styles.awesome_text}>Awesome!</div>

			<div>
				<span style={{ fontWeight: '800' }}>
					{startCase(name)}
					{' '}
					{employee_code}
					{' '}
				</span>
				{' '}
				has been successfully added as a new employee.
			</div>

			<div className={styles.button_wrapper}>
				<Button size="md" themeType="accent" onClick={onClickGoToDashboard}>
					Go To Dashboard
				</Button>
			</div>

		</div>
	);
}

export default SuccessComponent;
