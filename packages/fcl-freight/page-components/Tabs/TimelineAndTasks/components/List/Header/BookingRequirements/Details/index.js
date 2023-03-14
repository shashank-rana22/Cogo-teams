import getByKey from '@cogo/utils/getByKey';
import { isEmpty } from '@cogoport/front/utils';
import { renderValue } from '@cogo/business-modules/components/cargo-details/renderValue';
import controls from './controls.json';
import styles from './styles.module.css';

const Details = ({ mainServiceData = [], is_so1 = false }) => {
	const serviceDetailsKey = is_so1
		? controls.so1Details || []
		: controls.kamDetails || [];

	const multiServiceControls = controls.multiServiceControls || [];
	const supplyControls = controls.supplyControls || [];

	const renderDetail = (element, elementKey) => {
		const valueFormatted = renderValue(elementKey, mainServiceData?.[0]);

		return (
			<div className={styles.render_container}>
				<div className={styles.heading}>{element.label}</div>
				<div className={styles.value}>{valueFormatted}</div>
			</div>
		);
	};

	const renderMultiServiceDetails = (element, elementKey) => {
		const valueFormatted = renderValue(elementKey, mainServiceData?.[0]);

		let valueFormattedsec = '';
		if (!isEmpty(mainServiceData?.[1])) {
			valueFormattedsec = renderValue(elementKey, mainServiceData?.[1]);
		}

		return (
			<div className={styles.render_container}>
				<div className={styles.heading}>{element.label}</div>
				<div className={styles.value}>{valueFormatted}</div>
				{valueFormattedsec ? <div className={styles.value}>{valueFormattedsec}</div> : null}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			{is_so1 ? <div className={styles.sub_heading}>Demand Side</div> : null}

			<div className={styles.sub_container}>
				{is_so1
					? (multiServiceControls || []).map((element) => {
							return getByKey(mainServiceData?.[0], element.key)
								? renderMultiServiceDetails(element, element.key)
								: null;
					  })
					: null}

				{(serviceDetailsKey || []).map((element) => {
					return getByKey(mainServiceData?.[0], element.key)
						? renderDetail(element, element.key)
						: null;
				})}
			</div>

			{is_so1 ? (
				<>
					<Line />
					<div className={styles.sub_heading}>Supply Side</div>

					<div className={styles.sub_container}>
						{(supplyControls || []).map((element) => {
							return getByKey(mainServiceData?.[0], element.key)
								? renderDetail(element, element.key)
								: null;
						})}
					</div>
				</>
			) : null}
		</div>
	);
};

export default Details;
