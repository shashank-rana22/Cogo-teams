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
	CNCategoryValues = {}, setCNCategoryValues = () => {},
}) {
	const CN_VALUES_DATA = ['revenueOthers', 'nonRevenueOthers'];
	const RevenueImpacting =	CNCategoryValues?.CNType === 'REVENUE_IMPACTING'
	|| creditNoteType === 'REVENUE_IMPACTING';
	const NonRevenueImpacting =	CNCategoryValues?.CNType === 'NON_REVENUE_IMPACTING'
	|| creditNoteType === 'NON_REVENUE_IMPACTING';
	const STATUS_LIST = ['APPROVED', 'REJECTED'];

	useEffect(() => {
		setCNCategoryValues({
			CNType   : CNCategoryValues?.CNType,
			CNValues : null,
			remarks  : null,
		});
	}, [CNCategoryValues?.CNType, setCNCategoryValues]);

	useEffect(() => {
		setCNCategoryValues({
			CNType   : CNCategoryValues?.CNType,
			CNValues : CNCategoryValues?.CNValues,
			remarks  : null,
		});
	}, [CNCategoryValues?.CNValues, CNCategoryValues?.CNType, setCNCategoryValues]);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.texts}>{`${t('incidentManagement:cn_category_type')}*`}</div>
				<div className={styles.select_container}>
					<Select
						className="primary md"
						placeholder={`${t('incidentManagement:cn_category_type')}..`}
						value={creditNoteType || CNCategoryValues?.CNType}
						disabled={!isEditable || level1?.status === 'APPROVED'}
						onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNType: e })}
						options={categoryOptions({ t })}
					/>
				</div>
			</div>
			{(CNCategoryValues?.CNType
            || STATUS_LIST.includes(status)) && (
	<div>
		{RevenueImpacting && (
			<div className={styles.texts}>
				{`${t('incidentManagement:revenue_impacting')}*`}
			</div>
		)}
		{NonRevenueImpacting && (
			<div className={styles.texts}>
				{`${t('incidentManagement:non_revenue_impacting')}*`}
			</div>
		)}
		<div className={styles.select_container}>
			{RevenueImpacting && (
				<Select
					className="primary md"
					placeholder={t('incidentManagement:type_here_placeholder')}
					value={creditNoteRemarks || CNCategoryValues?.CNValues}
					disabled={!isEditable || level1?.status === 'APPROVED'}
					onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
					options={creditNoteRemarks
						? [...(revenueOptions({ t })), { label: creditNoteRemarks, value: creditNoteRemarks }]
						: revenueOptions({ t })}
				/>
			)}
			{NonRevenueImpacting && (
				<Select
					className="primary md"
					placeholder={t('incidentManagement:type_here_placeholder')}
					value={NON_REVENUE_DATA.includes(creditNoteRemarks) ? creditNoteRemarks
						: creditNoteRemarks || CNCategoryValues?.CNValues}
					disabled={!isEditable || level1?.status === 'APPROVED'}
					onChange={(e) => setCNCategoryValues({ ...CNCategoryValues, CNValues: e })}
					options={creditNoteRemarks ? [
						...(nonRevenueOptions({ t })),
						{ label: creditNoteRemarks, value: creditNoteRemarks }]
						: nonRevenueOptions({ t })}
				/>
			)}
		</div>
	</div>
			)}
			{CN_VALUES_DATA.includes(CNCategoryValues?.CNValues) && (
				<div>
					<div className={styles.texts}>{t('incidentManagement:remarks')}</div>

					<Textarea
						value={CNCategoryValues?.remarks}
						disabled={!isEditable}
						onChange={(e) => setCNCategoryValues({
							...CNCategoryValues,
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
