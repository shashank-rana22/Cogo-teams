import { Placeholder } from '@cogoport/components';

import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import Questions from '../../../../common/Questions';
import RoleSelect from '../../../../common/RoleSelect';

import styles from './styles.module.css';

function Content({ params = {}, setParams = () => {}, list = [], loading = false }) {
	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 8px" width="100%" height="80px" />
			<Placeholder margin="0px 0px 8px" width="100%" height="80px" />
		</div>
	);
	return (

		<div className={styles.popover_content}>
			<div className={styles.popover_header}>
				<p>
					Active Questions
				</p>

				<div className={styles.select_container}>
					<DepartmentSelect value={params.filters?.department} setValue={setParams} type="controller" />

					<RoleSelect
						value={params.filters?.work_scope}
						department={params.filters.department}
						setValue={setParams}
						type="controller"
					/>
				</div>
			</div>

			<div>
				{loading && showLoading()}

				{list?.length === 0 && !loading && <EmptyState />}

				{!loading && (list || []).map((item) => (
					<Questions
						key={item.id}
						item={item}
						type="active"
					/>
				))}
			</div>
		</div>
	);
}

export default Content;
