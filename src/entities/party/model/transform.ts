import { TransformDbCollection } from '@/shared/lib/RTDBTransform/DbCollectionToArray';
import { PartiesData, PartiesDb } from './folder';

export const dbToApp = (data: PartiesDb): PartiesData => {
  const folders = TransformDbCollection(data.folders);
  const chains = TransformDbCollection(data.chains);
  const parties = TransformDbCollection(data.parties);

  return {
    folders: folders.toArray,
    foldersById: folders.toIndex,
    chains: chains.toArray,
    chainsById: chains.toIndex,
    parties: parties.toArray,
    partiesById: parties.toIndex,
  };
};
