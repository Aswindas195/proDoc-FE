import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Pagination,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const contents = [
  { title: "Item 1", details: "Details of Item 1" },
  { title: "Item 2", details: "Details of Item 2" },
  { title: "Item 3", details: "Details of Item 3" },
  { title: "Item 4", details: "Details of Item 4" },
  { title: "Item 5", details: "Details of Item 5" },
  { title: "Item 6", details: "Details of Item 6" },
  { title: "Item 7", details: "Details of Item 7" },
  { title: "Item 8", details: "Details of Item 8" },
  { title: "Item 9", details: "Details of Item 9" },
  { title: "Item 10", details: "Details of Item 10" },
  // Add more items as needed
];

const ITEMS_PER_PAGE = 8;

const ResultsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const files = useSelector((state) => state.result);
  console.log(files);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedContents = contents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        {paginatedContents.map((content, index) => (
          <Accordion key={index} sx={{ borderRadius: "10px", my: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{content.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{content.details}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(contents.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ResultsPage;

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
