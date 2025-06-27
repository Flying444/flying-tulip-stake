import {TCard} from '../types'

export const TvlCard =({ namePool, totalAmount }: TCard) {
  return (
    <div className="flex flex-col space-y-4 p-4 border  w-auto">
      <p>{namePool}</p>
      <p>{totalAmount}</p>
    </div>
  );
}
