import  React, {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { IProduct } from './product.types';
import { Button, CircularProgress, Dialog } from '@mui/material';
import ProduceService from './product.service';
import ProductDetails from './ProductDetails';
import * as XLSX from "xlsx";
import ProductListToolbar from './ProductListHeader';
import ProductsTableHeader from './ProductsTableHeader';

const ProductList = () => {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState(100);

  useEffect(() => {
    console.log('loading', products);
    ProduceService.getProducts(rowsPerPage, page*rowsPerPage, searchTerm).then(data => {
      setProducts(data.products);
      setIsLoading(false);
      if(total !== data.total) {
        setTotal(data.total);
      }
    });
  }, [page, searchTerm]);

  useEffect(() => {
    const getData = setTimeout(() => {
      setSearchTerm(searchText);
    }, 2000)

    return () => clearTimeout(getData)
  }, [searchText])

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(products.filter(item => selected.includes(item.id)));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((n: IProduct) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  }

  const onSearchTermChange = (value: string) => {
    setPage(0);
    setIsLoading(true);
    setSearchText(value);
  }



  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ProductListToolbar numSelected={selected.length} downloadData={downloadExcel} onSearchChange={onSearchTermChange}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <ProductsTableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={products.length}
            />
            <TableBody>
              {products.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={() => handleClick(row.id)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.brand}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.discountPercentage}</TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                    <TableCell align="right"><Button onClick={() => showProductDetails(row)}>View</Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {isLoading ? <CircularProgress /> :<TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Paper>
      <Dialog onClose={() => setShowDetailsModal(false)} open={showDetailsModal} >
        {selectedProduct && <ProductDetails product={selectedProduct} onModalDismiss={setShowDetailsModal}/> }
      </Dialog>
    </Box>
  );
}

export default ProductList;