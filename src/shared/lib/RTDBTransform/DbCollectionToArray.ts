export const TransformDbCollection = <T extends object>(
  record: Record<string, T>,
) => {
  const toIndex = Object.fromEntries(
    Object.entries(record).map(([id, v]) => [id, { ...v, id }]),
  );
  return { toIndex, toArray: Object.values(toIndex) };
};
