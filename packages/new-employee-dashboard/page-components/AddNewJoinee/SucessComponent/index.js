import { Button, Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import AnimatedTick from '../../../common/AnimatedTick';
import useGetEmployeeDetails from '../useGetEmployeeDetails';

import styles from './styles.module.css';

function SuccessComponent({ activePage }) {
	const router = useRouter();

	const { data, loading } = useGetEmployeeDetails({ activePage });

	const { detail } = data || {};
	const { name, employee_code } = detail || {};

	const onClickGoToDashboard = () => {
		const HREF = '/new-employee-dashboard';
		router.push(HREF, HREF);
	};

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader width="100px" height="100px" style={{ height: '50px', width: '50px' }} />
			</div>
		);
	}

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
