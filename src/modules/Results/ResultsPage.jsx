const ResultPage = () => {
  return <></>;
};

export default ResultPage;

// import React, { useEffect } from 'react';
// import { itemsPerPagination } from '../../main/consts';
// import { Body2 } from '../../main/styles';
// import { Box, Pagination } from '@mui/material';
// import { useTranslation } from 'react-i18next';

// function PaginationComponent({
//   lengthOfItems,
//   itemsPerPage,
//   setItemsPerPage,
//   pageNumber,
//   setPageNumber,
//   showRecordsPerPage = true,
// }) {
//   const { t } = useTranslation();

//   const paginationRows = [
//     ...itemsPerPagination.filter((row) => row < lengthOfItems),
//     lengthOfItems,
//   ];
//   const countOfRows = Math.ceil(lengthOfItems / itemsPerPage);

//   const handleChangeForItemsPerPage = (event) => {
//     setItemsPerPage(event.target.value);
//     setPageNumber(1);
//   };

//   const handleChangeForPageNumber = (event, page) => {
//     setPageNumber(page);
//     countOfRows === lengthOfItems &&
//       setItemsPerPage(lengthOfItems % itemsPerPage);
//   };

//   useEffect(() => {
//     setPageNumber(1);
//     setItemsPerPage(8);
//   }, [lengthOfItems]);

//   return (
//     <Box
//       component={'div'}
//       sx={{
//         py: '10px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         width: '100%',
//         ...(!showRecordsPerPage && { justifyContent: 'center' }),
//       }}
//     >
//       {lengthOfItems > 0 && (
//         <>
//           {showRecordsPerPage && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//               <Body2>{t('common.paginationText')}</Body2>
//               <select
//                 name=""
//                 id=""
//                 onChange={handleChangeForItemsPerPage}
//                 disabled={lengthOfItems <= itemsPerPagination[0]}
//                 style={{
//                   display: 'block',
//                   background: 'none',
//                   outline: 'none',
//                   border: 'none',
//                   fontSize: '16px',
//                   width: 'max-content',
//                 }}
//               >
//                 {paginationRows?.map((row, i) => (
//                   <option key={i} value={row}>
//                     {row}
//                   </option>
//                 ))}
//               </select>
//               <Body2>of {lengthOfItems}</Body2>
//             </div>
//           )}
//           <Pagination
//             page={pageNumber}
//             count={countOfRows}
//             onChange={handleChangeForPageNumber}
//           />
//         </>
//       )}
//     </Box>
//   );
// }

// export default PaginationComponent;
