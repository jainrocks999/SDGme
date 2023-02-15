import React from 'react';
import FastImage from 'react-native-fast-image';

const fetchImageAsset = (goal) => {
  switch (goal) {
    case 1:
      return require('../../assets/goal-icons/no-poverty.png');
    case 2:
      return require('../../assets/goal-icons/zero-hunger.png');
    case 3:
      return require('../../assets/goal-icons/good-health.png');
    case 4:
      return require('../../assets/goal-icons/education.png');
    case 5:
      return require('../../assets/goal-icons/gender-equality.png');
    case 6:
      return require('../../assets/goal-icons/water.png');
    case 7:
      return require('../../assets/goal-icons/clean-energy.png');
    case 8:
      return require('../../assets/goal-icons/economic.png');
    case 9:
      return require('../../assets/goal-icons/infrastructure.png');
    case 10:
      return require('../../assets/goal-icons/inequalities.png');
    case 11:
      return require('../../assets/goal-icons/sustainable-cities.png');
    case 12:
      return require('../../assets/goal-icons/responsible.png');
    case 13:
      return require('../../assets/goal-icons/climate-action.png');
    case 14:
      return require('../../assets/goal-icons/below-water.png');
    case 15:
      return require('../../assets/goal-icons/life-land.png');
    case 16:
      return require('../../assets/goal-icons/peace.png');
    case 17:
      return require('../../assets/goal-icons/partnerships.png');
    default:
  }
};

const getGoalImage = (goal, isGoal) => (
  <FastImage
    style={{
      width: isGoal ? 50 : 60,
      height: isGoal ? 50 : 60,
      marginBottom: isGoal ? 0 : 5,
      marginLeft: isGoal ? 0 : 5,
    }}
    source={fetchImageAsset(goal)}
  />
);

export function GoalForDashboard({goal, onLoad}) {
  return (
    <FastImage
      style={{
        width: 110,
        height: 110,
        marginBottom: 5,
        marginLeft: 5,
      }}
      source={fetchImageAsset(goal)}
      onLoadEnd={() => {
        onLoad();
      }}
    />
  );
}

const LinkedGoals = ({goal, isGoal}) => getGoalImage(goal, isGoal);

export default LinkedGoals;
