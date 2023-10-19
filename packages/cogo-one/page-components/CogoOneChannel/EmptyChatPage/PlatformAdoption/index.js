import { Button, Pagination } from '@cogoport/components';
import { IcMPlansExpiring, IcMArrowNext, IcMFilter } from '@cogoport/icons-react';

import { ACTIVITY_MAPPING } from '../../../../constants/PLATFORM_ADOPTION_CONSTANTS';

import AdoptionList from './AdoptionList';
import styles from './styles.module.css';

function PlatformAdoption({ mailProps = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<div className={styles.title}>Task for the Day</div>
				<div className={styles.history_title}>
					<IcMPlansExpiring fill="#034afd" />
					view History
				</div>
			</div>
			<div className={styles.stats_section}>
				<div className={styles.tabs}>
					{(ACTIVITY_MAPPING || []).map((itm) => {
						const { label = '', name = '', count = '', isDot = false } = itm || {};

						return (
							<div key={name} className={styles.each_tab}>
								{isDot ? <div className={styles.red_dot} /> : null}
								<div className={styles.label}>
									{label}
									{' '}
									<span>{`(${count})`}</span>
								</div>
								<div className={styles.arrow_button}>
									<IcMArrowNext />
								</div>
							</div>
						);
					})}
				</div>
				<Button themeType="secondary">
					Filter By
					{' '}
					<IcMFilter width={15} height={15} />
				</Button>
			</div>
			<AdoptionList mailProps={mailProps} />
			<div className={styles.pagination_info}>
				<Pagination
					type="number"
					currentPage={1}
					totalItems={30}
					pageSize={6}
				/>
			</div>
		</div>
	);
}

export default PlatformAdoption;
