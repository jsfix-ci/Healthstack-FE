import React from 'react';
import { LocationCardWrapper } from './styles';

interface LocationCardProps {
  location: any;
  onClick: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onClick }) => {
  return (
    <LocationCardWrapper onClick={onClick}>
      {location.label}
    </LocationCardWrapper>
  );
};

export default LocationCard;
