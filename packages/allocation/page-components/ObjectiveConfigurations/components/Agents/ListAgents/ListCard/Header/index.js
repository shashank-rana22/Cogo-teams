import { Button, Pill } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_WEIGHTAGE = 100;
const DECIMAL_COUNT = 2;
const INDEX_LENGTH_NORMALIZATION = 1;

function Header(props) {
	const {
		role, user, partner, objectives, mode, setMode, handleSubmit, setValue, reset,
	} = props;

	const onSaveChanges = (values) => {
		console.log('values :: ', values);
	};

	const onDistributeEqually = () => {
		const objectivesCount = objectives?.length;
		const equalWeight = (DEFAULT_WEIGHTAGE / objectivesCount).toFixed(DECIMAL_COUNT);
		let lastWeightage = 100.00;

		objectives.forEach((objective, index) => {
			if (index === objectivesCount - INDEX_LENGTH_NORMALIZATION) {
				setValue(`${objective.id}_weightage`, (lastWeightage).toFixed(DECIMAL_COUNT));
			} else {
				setValue(`${objective.id}_weightage`, equalWeight);
				lastWeightage -= equalWeight;
			}
		});
	};

	const onDiscardChanges = () => {
		setMode('view');
		reset();
	};

	const BUTTON_MAPPING_BASIS_MODE = {
		view: (
			<Button
				type="button"
				themeType="secondary"
				onClick={() => setMode('edit')}
			>
				Edit Distribution
			</Button>
		),
		edit: (
			<>
				<Button
					type="button"
					themeType="link"
					onClick={onDistributeEqually}
				>
					Distribute Equally
				</Button>

				<Button
					type="button"
					themeType="secondary"
					onClick={onDiscardChanges}
				>
					Discard Changes
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(onSaveChanges)}
				>
					<IcMTick style={{ marginRight: '4px' }} />
					Save Changes
				</Button>
			</>
		),
	};

	return (
		<div className={styles.card_header}>
			<div className={styles.agent_detail}>
				<h4 className={styles.agent}>
					{role.name}
					:
					{' '}
					<strong>{user.name}</strong>
				</h4>

				<Pill size="md">
					Entity:
					{' '}
					{partner.business_name}
				</Pill>

				<Pill size="md">
					Channel:
					{' '}
					{role.role_sub_function}
				</Pill>
			</div>

			<div className={styles.button_container}>{BUTTON_MAPPING_BASIS_MODE[mode]}</div>
		</div>
	);
}

export default Header;
