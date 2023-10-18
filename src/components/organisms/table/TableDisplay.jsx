import { useState, Fragment } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  TableContainer,
  Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const TableDisplay = ({
  columns = [], // Columnas en formato {id: '', label: ''}
  data = [], // Arreglo con la data
  selected = [], // Rows selected en caso de contar con checkbox
  setSelected = () => {}, // Funcion para seleccionar rows en caso de contar con checkbox
  checkBox = false, // Booleano para mostrar checkbox
  page, // Pagina
  setPage, // Funcion para cambiar de pagina
  totalRecords, // Registros totales
  limit, // Cantidad maxima de registros
  setLimit, // Funcionar para cambiar maximo de registros
  headerClasses = '', // Estilos para cabecera
  headerBoxClasses = '', // Estilo para la caja de la cabecera
  rowClasses = '', // Estilos para las filas
  boxClasses = '', // Estilos para la caja maestra
  paginatorClasses = '', // Estilo para la caja del paginador
  setOrderMain = () => {}, // Funcion para setear el orden final
  customCol = [], // Funcion con renders, con el nombre de la columna que sera custom
  detailBox = null, // Detalle para abrir un acordion
  openIndex = null, // index para mostrar
  colorOdd = 'transparent', // Color cuando sea impar
  colorPair = '#F5F5F5', // Color cuando sea par
  checkboxClasses = {}, // Estilos para el checkbox
  detailBoxClasses = '', // Estilo para la caja de detalle
  activeOrderClasses = '', // Estilo para texto activo
  msgEmpty = 'No posee registros', // Mensaje cuando la tabla este vacia
  ...props
}) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    setOrderMain({ dir: isAsc ? 'desc' : 'asc', by: property });
  };

  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  return (
    <div className='w-full rounded-md border-2 border-black-600'>
      <TableContainer>
        <Table>
          <TableHead className={headerBoxClasses}>
            <TableRow>
              {checkBox ? (
                <TableCell padding="checkbox" className={headerClasses} />
              ) : null}
              {columns.map(headCell => (
                <TableCell
                  key={`cell-${headCell.label}`}
                  align={!headCell.align ? 'center' : headCell.align}
                  padding="normal"
                  className={headerClasses}
                  sortDirection={orderBy === headCell.id ? order : false}>
                  {headCell.id === '' ? (
                    <>{headCell.label}</>
                  ) : (
                    <TableSortLabel
                      classes={{
                        active: activeOrderClasses,
                      }}
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                      hideSortIcon>
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              let disabled = false;

              const isItemSelected = selected.indexOf(row.id) !== -1;
              if (selected.length > 0 && !isItemSelected) {
                disabled = true;
              }

              const labelId = `table-row-${index}`;
              return (
                <Fragment key={labelId}>
                  <TableRow
                    hover
                    onClick={event =>
                      disabled ? null : handleClick(event, row.id)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={labelId}
                    id={labelId}
                    style={
                      index % 2
                        ? { background: colorPair }
                        : { background: colorOdd }
                    }
                    selected={isItemSelected}>
                    {checkBox ? (
                      <TableCell padding="checkbox" className={rowClasses}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          disabled={disabled}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          classes={checkboxClasses}
                        />
                      </TableCell>
                    ) : null}
                    {columns.map((el, indexr) => {
                      let isCustom = false;
                      if (customCol[el.col]) {
                        isCustom = true;
                      }

                      return (
                        <TableCell
                          // eslint-disable-next-line react/no-array-index-key
                          key={`cell-content-${indexr}-${index}-${el.col}`}
                          id={`cell-content-${indexr}-${index}-${el.col}`}
                          component="td"
                          align={!el.align ? 'center' : el.align}
                          padding="normal"
                          className={rowClasses}>
                          {isCustom
                            ? customCol[el.col].render(row)
                            : row[el.col]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {detailBox != null && index === openIndex ? (
                    <TableRow
                      hover
                      id={`detalle-${labelId}`}
                      onClick={event =>
                        disabled ? null : handleClick(event, row.id)
                      }
                      key={`detalle-${row.name}`}
                      style={
                        index % 2
                          ? { background: '#F5F5F5' }
                          : { background: colorOdd }
                      }>
                      <TableCell
                        colSpan={columns.length}
                        className={detailBoxClasses}
                        padding="none">
                        {detailBox(row)}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}

            {data.length === 0 ? (
              <TableRow tabIndex={-1} style={{ background: colorOdd }}>
                <TableCell
                  component="td"
                  align="center"
                  className={rowClasses}
                  padding="normal"
                  colSpan={columns.length}>
                  {msgEmpty}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalRecords}
        rowsPerPage={limit}
        page={page}
        className={paginatorClasses}
        onPageChange={(evenrt, newPage) => setPage(newPage)}
        onRowsPerPageChange={({ target: { value } }) => setLimit(value)}
        labelRowsPerPage="Registros"
      />
    </div>
  );
};

export default TableDisplay;