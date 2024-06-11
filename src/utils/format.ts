export const formatPhone = (value: string): string => {
  const p = value.replace(/[^\d]/g, '');
  return p.length <= 2
    ? p
    : p.length <= 7
      ? `(${p.substring(0, 2)}) ${p.substring(2)}`
      : `(${p.substring(0, 2)}) ${p.substring(2, 3)} ${p.substring(3, 7)}-${p.substring(7, 11)}`;
};
