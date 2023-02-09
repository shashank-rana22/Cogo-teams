import { Button, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Header({
	setShowCreateRelationModal = () => {},
	setParams = () => {},
	setActiveTab = () => {},
}) {
	const onChangeToggle = (event) => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...((previousParams || {}).filters || {}),
				status: event?.target?.checked ? 'pending' : 'active',
			},
		}));
		setActiveTab(() => {
			if (event?.target?.checked) {
				return 'pending';
			}

			return 'active';
		});
	};

	return (
		<div className={styles.header_container}>

			<div>
				<Toggle
					name="relation_status"
					size="md"
					offLabel="Active"
					onLabel="Pending"
					style={{ padding: '0px' }}
					onChange={(event) => onChangeToggle(event)}
				/>
			</div>

			<div className={styles.button_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Company Name/User/Stakeholder"
					/>
				</div>
				<Button size="md" themeType="secondary">
					FILTER
					<IcMFilter style={{ marginLeft: '4px' }} />
					<div className={styles.filter_dot} />
				</Button>

				<Button
					size="md"
					themeType="accent"
					style={{ marginLeft: '8px' }}
					onClick={() => setShowCreateRelationModal(true)}
				>
					CREATE RELATION
				</Button>
			</div>

		</div>
	);
}

export default Header;
