import z from 'zod';

export const ROOT_ID = 'root';

export type TreeNode = {
  id: string;
  parentId: string;
  name: string;
};

export const TreeNodeSchema = z.object({
  parentId: z.string(),
  name: z.string(),
});

export const TreeNodeDBSchema = z.record(z.string(), TreeNodeSchema);
