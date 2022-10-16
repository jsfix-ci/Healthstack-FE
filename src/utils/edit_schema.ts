export const clientEditSchema: { type: string; options?: any[] }[] = [
  { type: 'TEXT' },
  { type: 'TEXT' },
  { type: 'TEXT' },
];
// if (isEditing && key !== 'id')
//   return (
//     <>
//       <DynamicInput
//         key={idx}
//         label={renderLabel(key)}
//         name={key}
//         value={details[0][key]}
//         inputType={`${returnInputType(idx)}`}
//         options={returnOptions(idx) || []}
//       />
//     </>
//   );
