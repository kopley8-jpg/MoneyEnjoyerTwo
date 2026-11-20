export type UserType = {
  profile: UserProfile;
  businessData: UserBusinessData;
};

type UserProfile = {
  name: string | null;
  email: string;
  createdAt: number;
};

type UserBusinessData = {
  parties: {
    folders: Folder[];
    chains: Chain[];
    parties: Party[];
  };
  positions: {
    folders: Folder[];
    positions: Position[];
  };
};

type Folder = {
  id: string;
  parentId: string | null;
  name: string;
};

type Chain = {
  id: string;
  folderId: string;
  name: string;
};

type Party = {
  id: string;
  parentType: 'folder' | 'chain';
  parentId: string;
  name: string;
  address?: string;
};

type Position =
  | {
      id: string;
      parentId: string;
      name: string;
    } & (
      | {
          type: 'moneyFlow';
        }
      | {
          type: 'item';
          measurementUnit: (typeof measurementUnits.item)[number];
        }
      | {
          type: 'service';
          measurementUnit: (typeof measurementUnits.service)[number];
        }
    );

type tr = {};

const measurementUnits = {
  item: ['mass', 'volume', 'count'],
  service: ['time', 'no-unit'],
} as const;
