export type BrowserFolders<Item> = Record<
  string,
  { parentId: string; name: string; item: Item }
>;
export type BrowserProps<Item> = {
  data: BrowserFolders<Item>;
  rootId: string;
  currentId?: string;
};
