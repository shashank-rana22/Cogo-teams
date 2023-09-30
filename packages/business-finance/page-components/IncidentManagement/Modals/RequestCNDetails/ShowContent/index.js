import { Button, Select, Textarea } from '@cogoport/components';
import { useEffect } from 'react';

import {
	categoryOptions, NON_REVENUE_DATA, nonRevenueOptions,
	revenueOptions,
} from '../Details/credit-note-config';

import styles from './styles.module.css';

function ShowContent({
	creditNoteType = '', isEditable = false, level1 = {},
	t = () => {}, status = '', creditNoteRemarks = '', setShowPopover = () => {},
	cNCategoryValues = {}, setCNCategoryValues = () => {},
}) {
	const CN_VALUES_DATA = ['revenueOthers', 'nonRevenueOthers'];
	const revenueImpacting =	cNCategoryValues?.CNType === 'REVENUE_IMPACTING'
	|| creditNoteType === 'REVENUE_IMPACTING';
	const nonRevenueImpacting =	cNCategoryValues?.CNType === 'NON_REVENUE_IMPACTING'
	|| creditNoteType === 'NON_REVENUE_IMPACTING';
	const STATUS_LIST = ['APPROVED', 'REJECTED'];

	useEffect(() => {
		setCNCategoryValues({
			CNType   : cNCategoryValues?.CNType,
			CNValues : null,
			remarks  : null,
		});
	}, [cNCategoryValues?.CNType, setCNCategoryValues]);

	useEffect(() => {
		setCNCategoryValues({
			CNType   : cNCategoryValues?.CNType,
			CNValues : cNCategoryValues?.CNValues,
			remarks  : null,
		});
	}, [cNCategoryValues?.CNValues, cNCategoryValues?.CNType, setCNCategoryValues]);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.texts}>{`${t('incidentManagement:cn_category_type')}*`}</div>
				<div className={styles.select_container}>
					<Select
						className="primary md"
						placeholder={`${t('incidentManagement:cn_category_type')}..`}
						value={creditNoteType || cNCategoryValues?.CNType}
						disabled={!isEditable || level1?.status === 'APPROVED'}
						onChange={(e) => setCNCategoryValues({ ...cNCategoryValues, CNType: e })}
						options={categoryOptions({ t })}
					/>
				</div>
			</div>
			{(cNCategoryValues?.CNType
            || STATUS_LIST.includes(status)) && (
	<div>
		{revenueImpacting && (
			<div className={styles.texts}>
				{`${t('incidentManagement:revenue_impacting')}*`}
			</div>
		)}
		{nonRevenueImpacting && (
			<div className={styles.texts}>
				{`${t('incidentManagement:non_revenue_impacting')}*`}
			</div>
		)}
		<div className={styles.select_container}>
			{revenueImpacting && (
				<Select
					className="primary md"
					placeholder={t('incidentManagement:type_here_placeholder')}
					value={creditNoteRemarks || cNCategoryValues?.CNValues}
					disabled={!isEditable || level1?.status === 'APPROVED'}
					onChange={(e) => setCNCategoryValues({ ...cNCategoryValues, CNValues: e })}
					options={creditNoteRemarks
						? [...(revenueOptions({ t })), { label: creditNoteRemarks, value: creditNoteRemarks }]
						: revenueOptions({ t })}
				/>
			)}
			{nonRevenueImpacting && (
				<Select
					className="primary md"
					placeholder={t('incidentManagement:type_here_placeholder')}
					value={NON_REVENUE_DATA.includes(creditNoteRemarks) ? creditNoteRemarks
						: creditNoteRemarks || cNCategoryValues?.CNValues}
					disabled={!isEditable || level1?.status === 'APPROVED'}
					onChange={(e) => setCNCategoryValues({ ...cNCategoryValues, CNValues: e })}
					options={creditNoteRemarks ? [
						...(nonRevenueOptions({ t })),
						{ label: creditNoteRemarks, value: creditNoteRemarks }]
						: nonRevenueOptions({ t })}
				/>
			)}
		</div>
	</div>
			)}
			{CN_VALUES_DATA.includes(cNCategoryValues?.CNValues) && (
				<div>
					<div className={styles.texts}>{t('incidentManagement:remarks')}</div>

					<Textarea
						value={cNCategoryValues?.remarks}
						disabled={!isEditable}
						onChange={(e) => setCNCategoryValues({
							...cNCategoryValues,
							remarks: e,
						})}
						placeholder={t('incidentManagement:remarks_placeholder')}
					/>

				</div>
			)}
			<div className={styles.button_container}>
				<Button themeType="primary" onClick={() => setShowPopover(false)}>
					{t('incidentManagement:done_btn')}
				</Button>
			</div>
		</div>
	);
}

export default ShowContent;
