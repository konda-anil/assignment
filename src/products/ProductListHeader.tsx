import { Download } from "@mui/icons-material";
import { Button, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { alpha } from '@mui/material/styles';

interface EnhancedTableToolbarProps {
  numSelected: number;
  downloadData: () => void;
  onSearchChange: (val: string) => void;
}

const ProductListToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, downloadData, onSearchChange } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
      <TextField
            label="Search"
            onChange={(e) => onSearchChange(e.target.value)}
            style={{marginRight: "40px"}}
          />
      {numSelected > 0 ? (
        <Tooltip title="Download">
            
          <Button style={{marginRight:'10px'}} onClick={downloadData} >
            <Download />
            Download
          </Button>
        </Tooltip>
      ) : (
        null
      )}
    </Toolbar>
  );
}

export default  ProductListToolbar;