import { cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import Buttons from './Buttons';
import EmptyState from './EmptyState';
import Info from './Info';
import styles from './styles.module.css';

const MINUS_ONE = -1;
function MarginValues({ data = {}, activeTab = '', setMarginBreakupData = () => {}, refetch = () => {} }) {
	const { margin_slabs = [], margin_slabs_currency } = data || [];
	function HandlePercentage({ item }) {
		if (item?.type === 'percentage') {
			if (item?.min_value && item?.max_value) {
				if (item?.min_value === item?.max_value) {
					return <div style={{ textAlign: 'center' }}>{item?.min_value}</div>;
				}
				return (
					<div
						style={{ textAlign: 'center' }}
					>
						{`${item?.currency}(${item?.min_value}-${item?.max_value})`}

					</div>
				);
			}
			return <div style={{ textAlign: 'center' }}>{`${item?.currency} 0`}</div>;
		}
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Margin Values</div>
			{isEmpty(data) ? <EmptyState />
				: (
					<div>
						<Info data={data} />
						<div className={styles.line} />
						{margin_slabs.map((val, index) => (
							<div key={`${`${index}${uuid()}`}`}>
								<div className={styles.header}>
									{`${val.lower_limit} - ${val.upper_limit === null
										? 'INF' : val.upper_limit} ${margin_slabs_currency}`}
									{' '}
									(Freight Price)
								</div>
								<div className={styles.flex}>
									<div className={styles.left}>CODE</div>
									<div className={styles.center}>VALUE</div>
									<div className={styles.right}>TYPE</div>
								</div>

								{(val?.margin_values || []).map((item) => (
									<div key={`${`${index * MINUS_ONE}${uuid()}`}`} className={styles.flex}>
										<div className={cl` ${styles.left} ${styles.bold}`}>{item?.code}</div>

										<div className={cl` ${styles.center} ${styles.bold}`}>
											{item?.type === 'percentage'
												? `${item?.value} %`
												: `${item?.currency} ${item?.value}`}
										</div>

										<div className={cl` ${styles.right} ${styles.smallFont}`}>
											<div>{startCase(item?.type)}</div>
											<HandlePercentage item={item} />
										</div>
									</div>
								))}

							</div>
						))}
						<div className={styles.line} />

						<Buttons
							data={data}
							activeTab={activeTab}
							setMarginBreakupData={setMarginBreakupData}
							refetch={refetch}
						/>
					</div>
				)}

		</div>
	);
}
export default MarginValues;
