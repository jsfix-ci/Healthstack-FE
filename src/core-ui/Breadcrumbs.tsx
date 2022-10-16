import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <MUIBreadcrumbs
      aria-label='breadcrumb'
      sx={{ display: 'flex', flexWrap: 'nowrap', color: '#000' }}
    >
      {pathnames.map((name, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        console.log(name);

        return last ? (
          <Typography
            color='text.primary'
            key={to}
            style={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontWeight: 'semi-bold',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
            {/* Pass breadcrumb context  */}
          </Typography>
        ) : (
          <Typography
            color='text.primary'
            key={to}
            style={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontWeight: 'semi-bold',
              whiteSpace: 'nowrap',
            }}
          >
            <Link to={to} key={to}>
              {name}
            </Link>
          </Typography>
        );
      })}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
