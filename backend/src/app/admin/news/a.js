'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Select from '@mui/material/Select';
import MenuItemSelect from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box, Button } from '@mui/material';

const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

const LongMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={{
        paper: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} onClick={onClose}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default function TailwindTable() {
  const [news, setNews] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');

  const trimTitle = (title) => {
    const maxLength = window.innerWidth < 640 ? 60 : 80;
    return title.length > maxLength ? `${title.slice(0, maxLength - 10)}...` : title;
  };

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
    const handleResize = () => setNews((prevNews) => [...prevNews]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedNews = [...news].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1; // Corrected
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1; // Corrected
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full p-2">
      <div className="flex justify-between mb-4">
      <FormControl
  variant="outlined"
  size="small"
  className="w-1/4"
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Change outline color
      },
      '&:hover fieldset': {
        borderColor: 'white', // Change hover outline color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', // Change focused outline color
      },
      '& .MuiSelect-select': {
        color: 'white', // Change selected number text color
      },
    },
    '& .MuiSelect-icon': {
      color: 'white', // Change the icon color if needed
    },
  }}
>
  <InputLabel id="rows-per-page-label">
    <span className='text-white'>Rows per page</span>
  </InputLabel>
  <Select
    labelId="rows-per-page-label"
    value={rowsPerPage}
    onChange={handleChangeRowsPerPage}
    label="Rows per page"
  >
    {[5, 10, 15, 20].map((size) => (
      <MenuItemSelect key={size} value={size}>
        {size}
      </MenuItemSelect>
    ))}
  </Select>
</FormControl>

        <div className="flex">
          <button
            onClick={(e) => handleChangePage(e, page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-700 text-white rounded-l-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={(e) => handleChangePage(e, page + 1)}
            disabled={page >= Math.ceil(news.length / rowsPerPage) - 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-r-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="overflow-auto shadow-lg border border-gray-700 rounded-lg">
        <table className="min-w-full table-auto text-left text-white bg-gray-800">
          <thead className="sticky top-0 bg-gray-900">
            <tr className='ltr'>
              <th className="py-4 ps-2 pe-20 text-xl">Title</th>
              <th className="py-4 text-sm text-center">Date</th>
              <th className="py-4 text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedNews
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-3 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
                    {trimTitle(row.title)}
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    {row.lastEdited ? new Date(row.lastEdited).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 text-center">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={Boolean(anchorEl) ? 'long-menu' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                      className="duration-200"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <LongMenu anchorEl={anchorEl} onClose={handleClose} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
