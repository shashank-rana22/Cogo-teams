import { Button, Loader } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import AnimatedTick from '../../../common/AnimatedTick';

import styles from './styles.module.css';

function SuccessComponent({ activePage }) {
	const router = useRouter();

	const [{ loading, data }] = useHarbourRequest(
		{
			method : 'GET',
			url    : '/get_employee_details',
			params : {
				id: activePage,
			},
		},
		{ manual: false },
	);

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
