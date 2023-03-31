import { Demand } from './types';
import { some, none } from './fp/maybe';

export const mockClient = [
  { name: 'Philip', demands: some([Demand.Driving, Demand.Fighting]), position: { x: 10, y: 30 }, reward: 600 },
  { name: 'Payne', demands: some([Demand.Driving]), position: { x: 5, y: 2 }, reward: 99 },
  { name: 'Paul', demands: some([Demand.Fighting]), position: { x: 10, y: 6 }, reward: 330 },
  { name: 'Raul', demands: none, position: { x: 0, y: 10 }, reward: 80 },
  { name: 'Fred', demands: some([Demand.Fishing]), position: { x: 15, y: 12 }, reward: 400 },
  { name: 'John', demands: some([Demand.Fishing, Demand.Fighting]), position: { x: 0, y: 0 }, reward: 250 },
];

export const mockExecutor = {
  name: 'executor',
  position: { x: 2, y: 0 },
  possibilities: [Demand.Fishing, Demand.Driving]
};
