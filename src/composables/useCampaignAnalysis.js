/**
 * Calculates the overall conversion rate of a campaign based on its first and last steps.
 * @param {Object} campaign 
 * @returns {number} The conversion rate percentage (e.g. 8.2)
 */
export function calculateOverallConversionRate(campaign) {
  if (!campaign || !campaign.steps || campaign.steps.length === 0) {
    return 0;
  }

  const firstStep = campaign.steps[0];
  const lastStep = campaign.steps[campaign.steps.length - 1];

  if (firstStep.views === 0) {
    return 0;
  }

  const overallRate = (lastStep.proceeds / firstStep.views) * 100;
  return Number(overallRate.toFixed(2));
}

/**
 * Calculates the conversion rate of a specific step.
 * @param {Object} step 
 * @returns {number} The conversion rate percentage for the step.
 */
export function calculateStepConversionRate(step) {
  if (!step || step.views === 0) {
    return 0;
  }

  const conversionRate = (step.proceeds / step.views) * 100;
  return Number(conversionRate.toFixed(2));
}

/**
 * Calculates the drop-off percentage of a specific step.
 * @param {Object} step 
 * @returns {number} The drop-off percentage for the step.
 */
export function calculateStepDropoffRate(step) {
  if (!step || step.views === 0) {
    return 0;
  }

  const dropoffRate = ((step.views - step.proceeds) / step.views) * 100;
  return Number(dropoffRate.toFixed(2));
}

/**
 * Finds the step with the highest drop-off rate in a campaign.
 * @param {Object} campaign 
 * @returns {Object|null} The step object with the biggest drop-off, or null if no steps.
 */
export function findBiggestDropoffStep(campaign) {
  if (!campaign || !campaign.steps || campaign.steps.length === 0) {
    return null;
  }

  return campaign.steps.reduce((worstStep, currentStep) => {
    const currentDropoff = calculateStepDropoffRate(currentStep);
    const worstDropoff = calculateStepDropoffRate(worstStep);

    return currentDropoff > worstDropoff ? currentStep : worstStep;
  }, campaign.steps[0]);
}

/**
 * Generates actionable insights based on campaign data.
 * @param {Object} campaign 
 * @returns {Array<string>} An array of recommendation strings.
 */
export function generateInsights(campaign) {
  if (!campaign || !campaign.steps || campaign.steps.length === 0) {
    return [];
  }

  const insights = [];
  const worstStep = findBiggestDropoffStep(campaign);

  if (!worstStep) return insights;

  const worstDropoffRate = calculateStepDropoffRate(worstStep);

  // Hard-coded rules based on step type and drop-off severity
  if (worstDropoffRate > 70) {
    insights.push(`The "${worstStep.name}" step has a critical drop-off of ${worstDropoffRate}%. Immediate attention is needed.`);

    if (worstStep.type === 'email') {
      insights.push('Consider reducing the number of input fields on the email form or offering a stronger incentive.');
    } else if (worstStep.type === 'teaser') {
      insights.push('The teaser might not be visible enough or the offer is not compelling to your audience. Try A/B testing the copy.');
    }
  } else if (worstDropoffRate > 50) {
    insights.push(`The "${worstStep.name}" step has a high drop-off. You might be losing potential conversions here.`);

    if (worstStep.type === 'coupon' || worstStep.type === 'success') {
      insights.push('Ensure the discount code is clearly visible and easy to copy.');
    }
  }

  // Add overall device specific recommendation
  if (campaign.device === 'mobile') {
    insights.push('Since this is a mobile campaign, verify that all buttons and input fields are easily tappable on small screens.');
  }

  if (insights.length === 0) {
    insights.push('Your campaign seems to be performing relatively well. Keep monitoring the metrics.');
  }

  return insights;
}
