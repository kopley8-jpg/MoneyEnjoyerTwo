export type TreeIssue = { path: (string | number)[]; message: string };

export const findFolderTreeIssues = (
  folders: Record<string, { parentId: string }>,
): TreeIssue[] => {
  let issues: TreeIssue[] = [];

  const checked = new Map<string, 'ok' | 'bad'>();

  for (const start of Object.entries(folders)) {
    if (checked.has(start[0])) continue;

    const path: string[] = [];
    let verdict: 'ok' | 'bad' | undefined;
    const onPath = new Set<string>();

    let { id, parentId }: { id: string; parentId: string } = {
      id: start[0],
      parentId: start[1].parentId,
    };
    while (!verdict) {
      const next = folders[parentId];

      if (parentId === 'root' || checked.get(parentId) === 'ok') {
        verdict = 'ok';
      } else if (checked.get(parentId) === 'bad') {
        issues.push({
          path: ['folders', id, 'parentId'],
          message: `Folder ${id} leads to wrong parent. ${
            path.length > 0 ? '[' + path.join(' -> ') + ' ->' : '['
          } ${id} moves to wrong ${parentId} ]`,
        });
        path.push(id);
        verdict = 'bad';
      } else if (onPath.has(parentId)) {
        const cycle = path.slice(path.indexOf(parentId));
        issues.push({
          path: ['folders', id, 'parentId'],
          message: `Folder ${id} makes cycle. [ ${cycle.join(
            ' -> ',
          )} -> ${id} moves against to ${parentId} ]`,
        });
        path.push(id);
        verdict = 'bad';
      } else if (!next) {
        path.push(id);
        issues.push({
          path: ['folders', id, 'parentId'],
          message: `Folder ${id} has no parent. ${path.join(
            ' -> ',
          )} -> not found`,
        });
        verdict = 'bad';
      } else {
        path.push(id);
        onPath.add(id);
        id = parentId;
        parentId = next.parentId;
      }
    }
    path.forEach(p => checked.set(p, verdict));
  }
  return issues;
};
