// import { Pill } from '@cogoport/components';
// import { startCase } from '@cogoport/utils';

import NestedLayout from '../../../common/NestedLayout';
// import getOriginDestination from '../../../helpers/getOriginDestination';

// import styles from './styles.module.css';

function Margin({
	// watch = () => {},
	// idValues = {},
	// type = '',
	// data = {},
	// service = '',
	marginControls = [],
	control = {},
	errors = {},
	customFieldArrayControls = {},
}) {
	// const formValues = watch();
	// const marginType = (margin_type) => {
	// 	if (margin_type === 'demand') {
	// 		return 'sales';
	// 	}
	// 	return margin_type;
	// };
	// const {
	// 	destination, origin, organization,
	// 	shipping_line, airline,
	// } = getOriginDestination({ type, idValues, data });
	return (
		<div>
			{/* <div className={styles.details_panel}>
				<div className={styles.flex_column}>
					<Pill color="green" className={styles.pill}>
						{marginType(formValues?.margin_type || data?.margin_type)}
					</Pill>
					<Pill color="yellow" className={styles.pill}>{startCase(service)}</Pill>

					<div className={styles.flex}>
						{origin && <Pill className={styles.pill}>{origin }</Pill>}
						{destination && <Pill className={styles.pill}>{ destination}</Pill>}
					</div>

					{organization ? (
						<Pill className={styles.pill}>{organization}</Pill>
					) : null}

					{shipping_line ? (
						<Pill className={styles.pill}>{shipping_line}</Pill>
					) : null}

					{airline ? (
						<Pill className={styles.pill}>{airline}</Pill>
					) : null}
				</div>
				<div>
					{(idValues?.container_size || data?.container_size)
						? <Pill>{idValues?.container_size || data?.container_size}</Pill> : null}
					{(idValues?.container_type || data?.container_type)
						? (
							<Pill>
								{idValues?.container_type || idValues?.container_type || data?.container_type }
							</Pill>
						) : null}
					{(idValues?.commodity || data?.commodity) && <Pill>{idValues?.commodity || data?.commodity}</Pill>}
					{(idValues?.trade_type || data?.trade_type)
						? <Pill>{idValues?.trade_type || data?.trade_type}</Pill> : null}
				</div>
			</div> */}
			<NestedLayout
				controls={marginControls}
				control={control}
				errors={errors}
				customFieldArrayControls={customFieldArrayControls}
			/>
		</div>
	);
}
export default Margin;
