import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import AnimatedTick from '../../../common/AnimatedTick';

import styles from './styles.module.css';

function SuccessComponent() {
	const router = useRouter();

	const name = 'Aditya Singh';
	const employeeCode = '(Cogo-1894)';

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
					{name}
					{' '}
					{employeeCode}
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
