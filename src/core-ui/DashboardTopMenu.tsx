import { Box, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import ReactSelect from '../components/ReactSelect/ReactSelect';
import Breadcrumbs from './Breadcrumbs';
import LocationModal from './LocationModal';
import LocationSelect from './LocationSelect';
import ProfileMenu from './ProfileMenu';
import { Profile, TopMenuWrapper } from './styles';

interface DashboardTopMenuProps {
  isOpen?: boolean;
  handleClick?: () => void;
  isApp?: boolean;
  hasBag?: boolean;
}

const defaultList = [
  { code: 'NG', label: 'Agege', location: 'Agege', value: 'NG/AG' },
  { code: 'NG', label: 'Ikeja', location: 'Agege', value: 'NG/IK' },
];

const DashboardTopMenu: React.FC<DashboardTopMenuProps> = ({
  isOpen,
  handleClick,
  isApp = true,
  hasBag = false,
}) => {
  const [locationOptions, setLocationOptions] = useState(defaultList);

  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [open, setOpen] = useState<boolean>(true);

  const handleSelectLocation = () => {
    setLocationOptions([]);
    setSelectedLocation([]);
  };

  return (
    <>
      {isApp && (
        <LocationModal
          locations={locationOptions}
          onSelectLocation={handleSelectLocation}
          open={open}
          setOpen={setOpen}
        />
      )}

      <TopMenuWrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
          <span
            onClick={handleClick}
            style={{
              fontSize: '1.2rem',
              marginRight: '1rem',
              fontWeight: 'bold',
            }}
          >
            {!isOpen ? (
              <i className='bi bi-list'></i>
            ) : (
              <i className='bi bi-list' />
            )}
          </span>
          <span className='breadcrumb'>
            <Breadcrumbs />
          </span>
        </Box>
        <Profile>
          {isApp && (
            <div className='location-selector'>
              {/* <LocationSelect
                defaultLocationId={selectedLocation?._id || ''}
                locations={locationOptions}
                onChange={handleSelectLocation}
              /> */}
              <ReactSelect options={defaultList} />
            </div>
          )}

          <Stack direction='row' alignItems='center' spacing={2}>
            {hasBag && (
              <IconButton sx={{ width: '32px', height: '32px', margin: 0 }}>
                <Box className='bi bi-bag-fill' />
              </IconButton>
            )}

            <IconButton sx={{ width: '32px', height: '32px', margin: 0 }}>
              <Box className='bi bi-bell-fill' />
            </IconButton>
            {/* <Avatar src="/img_avatar.png" alt="" /> */}
            <ProfileMenu />
          </Stack>
        </Profile>
      </TopMenuWrapper>
    </>
  );
};

export default DashboardTopMenu;
