import { startCase } from '@cogoport/utils';
import { useMemo, useState, useEffect } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
import usePostAgentScoringAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

const getAdditionalControls = ({
	paramScoringType = '',
	additionalControls = [],
}) => 	additionalControls.map(({
	customer_account_type, slab_attribute, slab_lower_limit, slab_upper_limit,
	base_score, fixed_percentage_value, variable_percentage_value, consideration_threshold,
	after_duration_threshold, after_scoring_parameter_id,
}) => ({
	customer_account_type      : customer_account_type || null,
	slab_attribute             : slab_attribute || null,
	slab_lower_limit           : slab_lower_limit || null,
	slab_upper_limit           : slab_upper_limit || null,
	consideration_threshold    : consideration_threshold || null,
	after_duration_threshold   : after_duration_threshold || null,
	after_scoring_parameter_id : after_scoring_parameter_id || null,
	...(paramScoringType === 'absolute' ? { base_score: base_score || null } : {
		fixed_percentage_value    : fixed_percentage_value || null,
		variable_percentage_value : variable_percentage_value || null,
	}),
}));

const useSubBlockCreation = (props) => {
	const {
		subBlockWiseParameterOptions,
		watch,
		blockIndex,
		subBlockIndex,
		refetch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		subBlockOptions,
		additionalControlsData,
	} = props;

	const [param, setParam] = useState(null);
	const [paramScoringType, setParamScoringType] = useState('');
	const [additionalControls, setAdditionalControls] = useState({});

	const formValues = watch();

	const watchSubBlock = formValues.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.sub_block_id;

	const { updateScoringAttributes, loading } = usePostAgentScoringAttributes();

	const parameterOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]?.map(
		({ label, value }) => ({ label, value }),
	), [subBlockWiseParameterOptions, watchSubBlock]);

	const controls = getPrimaryControls({ parameterOptions });

	const parameterUnitOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]
		?.reduce((acc, { value, unit }) => ({
			...acc,
			[value]: [{ label: startCase(unit), value: unit }],
		}), {}), [subBlockWiseParameterOptions, watchSubBlock]);

	const paramAdditionalControls = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]
		?.reduce((acc, { value, additional_controls: paramAddControls }) => ({
			...acc,
			[value]: paramAddControls,
		}), {}), [subBlockWiseParameterOptions, watchSubBlock]);

	const filteredSubBlockOptions = useMemo(() => {
		const selectedBlockOptions = formValues.blocks[blockIndex]
			?.sub_blocks?.reduce((accumulator, currentValue, currentIndex) => {
				if (currentIndex < subBlockIndex) {
					const accumulatorCopy = [...accumulator];
					accumulatorCopy.push(currentValue.sub_block_id);

					return accumulatorCopy;
				}
				return accumulator;
			}, []);

		return subBlockOptions.filter((item) => !selectedBlockOptions.includes(item.value));
	}, [formValues.blocks, blockIndex, subBlockOptions, subBlockIndex]);

	const checkForSubBlock = () => prefillValues[blockIndex]
		?.sub_blocks?.find((item) => item.sub_block_id === watchSubBlock);

	const handleClick = async ({ subBlockStatus = '' } = {}) => {
		if (!editSubBlock[blockIndex]?.[subBlockIndex]) {
			setEditSubBlock((prev) => ({
				...prev,
				[blockIndex]: {
					...prev[blockIndex],
					[subBlockIndex]: true,
				},
			}));
			return;
		}

		handleSubmit(async () => {
			const subBlockValues = watch(`blocks[${blockIndex}].sub_blocks[${subBlockIndex}]`) || {};

			const agentScoringBlockId = subBlockValues.sub_block_id;

			const agentScoringParameters = subBlockValues.parameters?.map((item) => ({
				agent_scoring_parameter_id : item.parameter,
				scoring_type               : item.scoring_type,
				...(item.scoring_type === 'absolute' ? { base_score: item.base_score || undefined } : {
					fixed_percentage_value    : item.fixed_percentage_value || undefined,
					variable_percentage_value : item.variable_percentage_value || undefined,
				}),
				provisional_trigger : item.provisional_trigger,
				realised_trigger    : item.realised_trigger,
				additional_controls : getAdditionalControls({
					paramScoringType   : item.scoring_type,
					additionalControls : additionalControls[item.parameter],
				}),

			}));

			await updateScoringAttributes({ agentScoringBlockId, agentScoringParameters, subBlockStatus });

			refetch();
		})();
	};

	useEffect(() => {
		setAdditionalControls(paramAdditionalControls);
	}, [paramAdditionalControls]);

	useEffect(() => {
		const updatedAdditionalControls = Object.keys(paramAdditionalControls || {}).reduce((result, key) => ({
			...result,
			[key]: (key in (additionalControlsData[watchSubBlock] || {}))
				? additionalControlsData[watchSubBlock][key] : paramAdditionalControls[key],
		}), {});

		setAdditionalControls(updatedAdditionalControls);
	}, [additionalControlsData, paramAdditionalControls, watchSubBlock]);

	return {
		param,
		setParam,
		Element,
		controls,
		loading,
		watchSubBlock,
		handleClick,
		checkForSubBlock,
		paramScoringType,
		parameterOptions,
		setParamScoringType,
		parameterUnitOptions,
		additionalControls,
		setAdditionalControls,
		filteredSubBlockOptions,
	};
};

export default useSubBlockCreation;
