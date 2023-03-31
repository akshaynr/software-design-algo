import { Either, fromPromise, ap, right, getOrElse, flatten, left } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, Demand, ExecutorUser } from './types';
import { isNone, getOrElse as maybeGetOrElse } from './fp/maybe';

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient());

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const filteredClients = clients.filter((element) => {
    return isNone(element.demands) ? true :  element.demands.value.filter((demandElement) => executor.possibilities.indexOf(demandElement) != -1).length > 0
  });

  const sortedClients = filteredClients.sort((a, b) => sortBy == SortBy.reward ? b.reward - a.reward 
    : Math.sqrt((a.position.x - executor.position.x) ** 2 + (a.position.y - executor.position.y) ** 2) - Math.sqrt((b.position.x - executor.position.x) ** 2 + (b.position.y - executor.position.y) ** 2)
  );

  let additionalText = `\n\nAvailable clients sorted by ${sortBy == SortBy.reward ? 'highest reward:' : 'distance to executor:'}`;
  sortedClients.forEach((element) => additionalText += `\nname: ${element.name}, distance: ${Math.sqrt((element.position.x - executor.position.x) ** 2 + (element.position.y - executor.position.y) ** 2).toFixed(3)}, reward: ${element.reward}`);

  let text = filteredClients.length == clients.length 
  ? right(`This executor meets all demands of all clients!`)
  : filteredClients.length == 0 
    ? left(`This executor cannot meet the demands of any client!`)
    : right(`This executor meets the demands of only ${filteredClients.length} out of ${clients.length} clients${additionalText}`);
  return text;
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);
