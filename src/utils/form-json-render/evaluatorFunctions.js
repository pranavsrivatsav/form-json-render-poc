function checkCondition(depValue, operator, value) {
  console.log('checkCondition', depValue, operator, value);
  switch (operator) {
    case 'equals':
      return depValue === value;
    case 'notEquals':
      return depValue !== value;
    case 'greaterThan':
      return depValue > value;
    case 'lessThan':
      return depValue < value;
    case 'in':
      return Array.isArray(value) && value.includes(depValue);
    case 'notIn':
      return Array.isArray(value) && !value.includes(depValue);
    default:
      return false;
  }
}

// Recursive function to evaluate the condition with operators
function evaluateCondition(conditions, watchValues) {
  // Base case: If there's no condition, it's considered true
  if (!Array.isArray(conditions)) return true;

  return conditions.every((condition) => {
    // If the condition has an operator (AND/OR), process it recursively
    if (['and', 'or'].includes(condition.operator)) {
      if (condition.operator === 'and') {
        return condition.conditions.every(({ operator, field: depField, value }) => {
          const depValue = watchValues[depField];
          return checkCondition(depValue, operator, value);
        });
      }

      if (condition.operator === 'or') {
        return condition.conditions.some(({ operator, field: depField, value }) => {
          const depValue = watchValues[depField];
          return checkCondition(depValue, operator, value);
        });
      }
    } else {
      // If not 'and' or 'or', it's just a simple condition
      console.log('resolving check condition');
      const depValue = watchValues[condition.field];
      return checkCondition(depValue, condition.operator, condition.value);
    }

    return false; // Fallback if no operator matches
  });
}

export function evaluateVisibility(field, watchValues) {
  if (!field.visibleWhen) return true;
  
  console.log('field', field);
  // Evaluate the top-level condition (visibleWhen)
  const result = evaluateCondition([field.visibleWhen], watchValues);
  console.log('result', result);
  return result;
}

