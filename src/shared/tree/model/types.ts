import z from 'zod';

export const ROOT_ID = 'root';

export type TreeNode = {
  id: string;
  parentId: string;
  name: string;
};

export type Folder = TreeNode;

export const TreeNodeSchema = z.object({
  parentId: z.string(),
  name: z.string(),
});

export const TreeNodesDBSchema = z.record(z.string(), TreeNodeSchema);
